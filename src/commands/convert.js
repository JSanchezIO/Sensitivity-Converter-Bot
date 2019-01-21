const ArgumentParser = require('argparse').ArgumentParser;
const constants = require('../utilities/constants');
const formatter = require('../utilities/formatter');
const math = require('mathjs');
const pkg = require('../../package.json');

class Convert {
  get name() {
    return '/convert-sens';
  }

  constructor() {
    ArgumentParser.prototype.exit = (_, message) => {
      throw new Error(message);
    };
  }

  convertBetweenGames(from, to, sensitivity, decimals) {
    const inputUnit = constants.units.find(unit => unit.aliases.some(alias => alias.toLowerCase() === from));

    if (inputUnit === undefined || inputUnit === null) {
      return `For some reason the "-f/--from" unit type, "${from}" couldn't be located.`;
    }

    const outputUnit = constants.units.find(unit => unit.aliases.some(alias => alias.toLowerCase() === to));

    if (outputUnit === undefined || outputUnit === null) {
      return `For some reason the "-t/--to" unit type, "${to}" couldn't be located.`;
    }

    if (inputUnit.name === outputUnit.name) {
      return "The input data's unit type is already in the output data's unit type";
    }

    const trueSensitivity = math.multiply(inputUnit.yaw, sensitivity);

    const outputSensitivity = math
      .chain(trueSensitivity)
      .divide(outputUnit.yaw)
      .round(decimals)
      .done();

    return `The ${inputUnit.name} sensitivity ${sensitivity} is approximately ${outputSensitivity} in ${outputUnit.name}`;
  }

  convertFromRev(from, to, sensitivity, cpi, decimals) {
    const inputUnit = constants.units.find(unit => unit.aliases.some(alias => alias.toLowerCase() === from));

    if (inputUnit === undefined || inputUnit === null) {
      return `For some reason the "-f/--from" unit type, "${from}" couldn't be located.`;
    }

    const outputUnit = constants.units.find(unit => unit.aliases.some(alias => alias.toLowerCase() === to));

    if (outputUnit === undefined || outputUnit === null) {
      return `For some reason the "-t/--to" unit type, "${to}" couldn't be located.`;
    }

    const outputSensitivity = math
      .chain(360)
      .divide(math.multiply(math.divide(sensitivity, inputUnit.name.includes('cm') ? 2.54 : 1), cpi))
      .divide(outputUnit.yaw)
      .round(decimals)
      .done();

    return `The ${sensitivity}${inputUnit.name} is approximately ${outputSensitivity} in ${outputUnit.name}`;
  }

  convertToRev(from, to, sensitivity, cpi, decimals) {
    const inputUnit = constants.units.find(unit => unit.aliases.some(alias => alias.toLowerCase() === from));

    if (inputUnit === undefined || inputUnit === null) {
      return `For some reason the "-f/--from" unit type, "${from}" couldn't be located.`;
    }

    const outputUnit = constants.units.find(unit => unit.aliases.some(alias => alias.toLowerCase() === to));

    if (outputUnit === undefined || outputUnit === null) {
      return `For some reason the "-t/--to" unit type, "${to}" couldn't be located.`;
    }

    const trueSensitivity = math.multiply(inputUnit.yaw, sensitivity);

    const measurement = math
      .chain(360)
      .divide(cpi)
      .divide(trueSensitivity)
      .multiply(outputUnit.name === 'cm/rev' ? 2.54 : 1)
      .round(decimals)
      .done();

    return `The ${inputUnit.name} sensitivity ${sensitivity} is approximately ${measurement}${outputUnit.name}`;
  }

  exec(message) {
    const parser = new ArgumentParser({
      addHelp: true,
      description: pkg.description,
      prog: pkg.name,
      version: pkg.version
    });

    parser.addArgument(['-c', '--cpi'], {
      defaultValue: 800,
      help:
        "Incorrectly referred to as DPI, or dots per inch, the CPI or counts per inch refers to the number of steps the mouse will report when moving an inch, i.e. this is the target mouse's DPI.",
      type: 'int'
    });

    parser.addArgument(['-d', '--decimals'], {
      choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      defaultValue: 5,
      help: 'The number of decimal places to round the output to, defaults to 2.',
      type: 'int'
    });

    const units = constants.units.map(unit => unit.aliases).flat();

    parser.addArgument(['-f', '--from'], {
      choices: units,
      help: `The input data's unit type. The following options are available: ${formatter.quoteStringArray(units)}`,
      required: true
    });

    parser.addArgument(['-s', '--sens', '--sensitivity'], {
      dest: 'sensitivity',
      help: 'The sensitivity in the units indicated by the "-f/--from" argument.',
      required: true
    });

    parser.addArgument(['-t', '--to'], {
      choices: units,
      help: `The output data's unit type. The following options are available: ${formatter.quoteStringArray(units)}`,
      required: true
    });

    const commands = message.split(/ +/);
    const result = this.validate(commands, parser);

    if (result !== undefined && result !== null && result !== '') {
      return result;
    }

    try {
      const args = parser.parseArgs(commands);

      if (args.from === args.to) {
        return "The input data's unit type is already in the output data's unit type";
      }

      const isFromRev = args.from.includes('rev');
      const isToRev = args.to.includes('rev');

      if (isFromRev && isToRev) {
        const result = math.round(
          args.to.includes('cm') ? math.multiply(args.sensitivity, 2.54) : math.divide(args.sensitivity, 2.54),
          args.decimals
        );

        return `The ${args.sensitivity}${args.from} is approximately ${result}${args.to}`;
      } else if (isFromRev) {
        return this.convertFromRev(args.from, args.to, args.sensitivity, args.cpi, args.decimals);
      } else if (isToRev) {
        return this.convertToRev(args.from, args.to, args.sensitivity, args.cpi, args.decimals);
      } else {
        return this.convertBetweenGames(args.from, args.to, args.sensitivity, args.decimals);
      }
    } catch (err) {
      return err.message;
    }
  }

  validate(commands, parser) {
    if (commands.includes('-v') || commands.includes('--version')) {
      return `${parser.prog} v${parser.version}`;
    }

    if (commands.length === 1 || commands.includes('-h') || commands.includes('--help')) {
      let results = [
        "I'm designed to convert sensitivities across multiple games. Based on the magic from KovaaK's Sensitivity Matcher.",
        'Example Usage:',
        '```sh\n' + this.name + ' --from fortnite-config --sens 0.02 --to cm/rev\n```',
        'Arguments/Flags:',
        '```sh\n-h, --help     Show this help message\n-v, --version  Show my version number\n-c, --cpi      The target mouse\'s DPI\n-d, --decimals The number of decimal places, 0 - 15, to round the output to, defaults to 5\n-f, --from     The input "-s/--sens/--sensitivity" data type\n-s, --sens, --sensitivity  The sensitivity to be converted. Must be in the units specified in "-f/--from"\n-t, --to       The data type to convert the "-s/--sens/--sensitivity" to\n```',
        'Supported Sensitivity Types:',
        '```\n' +
          constants.units
            .map(unit => unit.aliases)
            .flat()
            .join(', ') +
          '\n```'
      ];

      return results;
    }
  }
}

module.exports = Convert;
