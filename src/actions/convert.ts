import { ArgumentParser } from 'argparse';
import { chain, divide, isNumeric, MathType, multiply, number, round } from 'mathjs';
import { IAction, IConvertArgs, ILogger, IMetric, IResult } from '../interfaces';
import { metrics } from '../utilities';

export default class Convert implements IAction {
  public readonly aliases: string[] = ['convert', 'sens', 'sens-pub'];

  public readonly command: string = 'convert-sens';

  private readonly parser: ArgumentParser;

  private readonly logger: ILogger;

  private readonly metricChoices: string[];

  constructor(logger: ILogger) {
    this.logger = logger;
    this.metricChoices = metrics
      .map(metric => metric.aliases)
      .reduce((prevVal: string[], currVal: string[]) => prevVal.concat(currVal), []);

    ArgumentParser.prototype.exit = (_, message) => {
      throw new Error(message);
    };

    this.parser = new ArgumentParser({
      addHelp: false,
      description:
        "A Discord bot designed to convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher.",
      prog: this.command,
      version: '1.2.0'
    });

    this.parser.addArgument(['-c', '--cpi'], {
      defaultValue: 800,
      help:
        "Incorrectly referred to as DPI, or dots per inch, the CPI or counts per inch refers to the number of steps the mouse will report when moving an inch, i.e. this is the target mouse's DPI.",
      type: 'int'
    });

    this.parser.addArgument(['-d', '--decimals'], {
      choices: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
      defaultValue: '5',
      help: 'The number of decimal places to round the output to, defaults to 5.'
    });

    this.parser.addArgument(['-h', '--help'], {
      action: 'storeTrue',
      dest: 'help',
      help: 'Prints this help message.'
    });

    this.parser.addArgument(['-p', '--public'], {
      action: 'storeTrue',
      dest: 'public',
      help: 'Denotes if the result should be displayed in the requesting channel.'
    });

    this.parser.addArgument(['-u', '--units'], {
      action: 'storeTrue',
      dest: 'units',
      help: 'Show the supported sensitivity types.'
    });

    this.parser.addArgument(['--usage'], {
      action: 'storeTrue',
      dest: 'usage',
      help: 'Show multiple examples.'
    });

    this.parser.addArgument('sensitivity', {
      help: 'The sensitivity in the units indicated by the "from" argument.',
      type: 'float'
    });

    this.parser.addArgument('from', {
      help: "The input data's unit type or custom yaw."
    });

    this.parser.addArgument('to', {
      help: "The output data's unit type or custom yaw."
    });
  }

  public exec(request: string): IResult {
    const result: IResult = {
      deleteRequest: true,
      messages: [],
      sendPrivately: true
    };

    const command: string = request.substr(1, request.indexOf(' ') - 1);

    request = request.replace(`/${command} `, '');

    try {
      const args: IConvertArgs = this.parser.parseArgs(request.split(/ +/));

      result.deleteRequest = !(args.public || command === 'sens-pub');
      result.sendPrivately = result.deleteRequest;

      if (args.help) {
        result.messages.push('```\n' + this.parser.formatHelp() + '\n```');
        return result;
      }

      if (args.units) {
        result.messages.push('```\n' + `The following units are available:\n${this.metricChoices}` + '\n```');
        return result;
      }

      if (args.usage) {
        result.messages.push('```\n' + this.parser.formatUsage() + '\n```');
        return result;
      }

      const isFromRev: boolean = args.from.includes('rev');
      const isToRev: boolean = args.to.includes('rev');

      if (args.from === args.to) {
        result.messages.push("The input data's unit type is already in the output data's unit type");
        return result;
      }

      if (isFromRev && isToRev) {
        const outputSensitivity: MathType = round(
          args.to.includes('cm') ? multiply(args.sensitivity, 2.54) : divide(args.sensitivity, 2.54),
          args.decimals
        );

        result.messages.push(`The ${args.sensitivity}${args.from} is approximately ${outputSensitivity}${args.to}`);
        return result;
      }

      if (isFromRev) {
        result.messages.push(this.convertFromRev(args.from, args.sensitivity, args.to, args.cpi, args.decimals));
        return result;
      }

      if (isToRev) {
        result.messages.push(this.convertToRev(args.from, args.sensitivity, args.to, args.cpi, args.decimals));
        return result;
      }

      result.messages.push(this.convertBetweenGames(args.from, args.sensitivity, args.to, args.decimals));
    } catch (err) {
      if (err.message.includes('too few arguments')) {
        return this.exec('1 cm/rev cm/rev ' + request);
      }

      // @ts-ignore
      if (err.message.includes(`${this.parser.prog}: error: ${this.parser.version}`)) {
        err.message = err.message.replace(': error: ', ' v');
      }

      result.messages.push(err.message);
    }

    return result;
  }

  private convertBetweenGames(from: string, sensitivity: number, to: string, decimals: number): string {
    const fromMetric: IMetric = this.findMetric(from, 'from');
    const toMetric: IMetric = this.findMetric(to, 'to');

    if (fromMetric.name === toMetric.name) {
      return "The input data's unit type is already in the output data's unit type";
    }

    const trueSensitivity = multiply(fromMetric.yaw, sensitivity);

    const outputSensitivity = chain(trueSensitivity)
      .divide(toMetric.yaw)
      .round(decimals)
      .done();

    return `The ${fromMetric.name} sensitivity ${sensitivity} is approximately ${outputSensitivity} in ${toMetric.name}`;
  }

  private convertFromRev(from: string, sensitivity: number, to: string, cpi: number, decimals: number): string {
    const fromMetric: IMetric = this.findMetric(from, 'from');
    const toMetric: IMetric = this.findMetric(to, 'to');

    const outputSensitivity = chain(360)
      .divide(multiply(divide(sensitivity, fromMetric.name.includes('cm') ? 2.54 : 1), cpi))
      .divide(toMetric.yaw)
      .round(decimals)
      .done();

    return `With ${cpi} CPI ${sensitivity}${fromMetric.name} is approximately ${outputSensitivity} in ${toMetric.name}`;
  }

  private convertToRev(from: string, sensitivity: number, to: string, cpi: number, decimals: number): string {
    const fromMetric: IMetric = this.findMetric(from, 'from');
    const toMetric: IMetric = this.findMetric(to, 'to');

    const trueSensitivity: MathType = multiply(fromMetric.yaw, sensitivity);

    const measurement = chain(360)
      .divide(cpi)
      .divide(trueSensitivity)
      .multiply(toMetric.name === 'cm/rev' ? 2.54 : 1)
      .round(decimals)
      .done();

    return `With ${cpi} CPI the ${fromMetric.name} sensitivity ${sensitivity} is approximately ${measurement}${toMetric.name}`;
  }

  private findMetric(name: string, param: 'from' | 'to'): IMetric {
    const metric: IMetric | undefined = metrics.find(m => m.aliases.some(alias => alias.toLowerCase() === name));

    if (metric === undefined || metric === null) {
      // @ts-ignore
      if (isNaN(name)) {
        throw new Error(`For some reason the "${param}" unit type, "${name}", couldn't be found`);
      }

      return {
        aliases: [],
        name: `Custom Yaw (${name})`,
        yaw: number(name)
      };
    }

    return metric;
  }
}
