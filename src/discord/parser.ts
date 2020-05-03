import { ArgumentParser } from 'argparse';
import Package from '../../package.json';
import Converter from './converter';

type ParserResult = {
  /** Denotes if the requesting message should be deleted */
  deleteRequest: boolean;

  /** The messages to send to the user */
  messages: string[];

  /** Denotes if the resulting messages should be sent privately */
  sendPrivately: boolean;
};

/**
 * The arguments available for the `convert` action.
 */
type ParserArgs = {
  /**
   * The CPI (DPI) of the target mouse.
   */
  cpi: number;

  /**
   * The amount of decimal places requested.
   */
  decimals: number;

  /**
   * The input sensitivity metric.
   */
  from: string;

  /**
   * Prints the help message.
   */
  help: boolean;

  /**
   * Prints the result publically.
   */
  public: boolean;

  /**
   * The sensitivity in the from metric.
   */
  sensitivity: number;

  /**
   * The output sensitivity metric.
   */
  to: string;

  /**
   * Prints the available metrics.
   */
  units: boolean;

  /**
   * Prints example usage statements.
   */
  usage: boolean;

  /**
   * The current version.
   */
  version: boolean;
};

class Parser {
  private readonly _aliases = ['convert', 'convert-sens', 'sens', 'sens-pub'];

  private readonly _converter: Converter;

  private readonly _parser: ArgumentParser;

  constructor() {
    this._converter = new Converter();

    ArgumentParser.prototype.exit = (_, message) => {
      throw new Error(message);
    };

    this._parser = new ArgumentParser({
      addHelp: false,
      description:
        "A Discord bot designed to convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher.",
      prog: 'convert-sens',
      version: Package.version,
    });

    this.initializeArgumentParser();
  }

  private initializeArgumentParser() {
    this._parser.addArgument(['-c', '--cpi'], {
      defaultValue: 800,
      help:
        "Incorrectly referred to as DPI, or dots per inch, the CPI or counts per inch refers to the number of steps the mouse will report when moving an inch, i.e. this is the target mouse's DPI.",
      type: 'int',
    });

    this._parser.addArgument(['-d', '--decimals'], {
      choices: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
      ],
      defaultValue: '5',
      help: 'The number of decimal places to round the output to, defaults to 5.',
    });

    this._parser.addArgument(['-h', '--help'], {
      action: 'storeTrue',
      dest: 'help',
      help: 'Prints this help message.',
    });

    this._parser.addArgument(['-p', '--public'], {
      action: 'storeTrue',
      dest: 'public',
      help: 'Denotes if the result should be displayed in the requesting channel.',
    });

    this._parser.addArgument(['-u', '--units'], {
      action: 'storeTrue',
      dest: 'units',
      help: 'Show the supported sensitivity types.',
    });

    this._parser.addArgument(['--usage'], {
      action: 'storeTrue',
      dest: 'usage',
      help: 'Show multiple examples.',
    });

    this._parser.addArgument('sensitivity', {
      help: 'The sensitivity in the units indicated by the "from" argument.',
      type: 'float',
    });

    this._parser.addArgument('from', {
      help: "The input data's unit type or custom yaw.",
    });

    this._parser.addArgument('to', {
      help: "The output data's unit type or custom yaw.",
    });
  }

  public get aliases() {
    return this._aliases;
  }

  public execute(request: string): ParserResult {
    const result: ParserResult = {
      deleteRequest: true,
      messages: [],
      sendPrivately: true,
    };

    const regex = new RegExp(`^/(${this._aliases.join('(?!-)|')}) ?`, 'g');
    let cleanRequest = request.replace(regex, '');

    if (!cleanRequest) {
      cleanRequest = '-h';
    }

    try {
      const args: ParserArgs = this._parser.parseArgs(cleanRequest.split(/ +/));

      result.deleteRequest = !(args.public || /^\/sens-pub ?/.test(request));
      result.sendPrivately = result.deleteRequest;

      if (args.help) {
        result.messages.push(`\`\`\`\n${this._parser.formatHelp()}\n\`\`\``);
        return result;
      }

      if (args.units) {
        result.messages.push(
          `\`\`\`\nThe following units are available:\n${this._converter.getSupportedUnits()}\`\`\`\n`
        );
        return result;
      }

      if (args.usage) {
        result.messages.push(`\`\`\`\n${this._parser.formatUsage()}\n\`\`\``);
        return result;
      }

      result.messages.push(
        this._converter.convert(args.sensitivity, args.from, args.to, args.cpi, args.decimals)
      );
    } catch (err) {
      if (err.message.includes('too few arguments')) {
        return this.execute(`1 cm/rev cm/rev ${cleanRequest}`);
      }

      // @ts-ignore
      if (err.message.includes(`${this._parser.prog}: error: ${this._parser.version}`)) {
        err.message = err.message.replace(': error: ', ' v');
      }

      result.messages.push(err.message);
    }

    return result;
  }
}

export default Parser;
