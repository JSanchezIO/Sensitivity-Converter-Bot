import { round } from 'mathjs';
import GameSettings from '../domain/gameSettings';
import CentimetersPerRevolution from '../domain/measurements/centimetersPerRevolution';
import DegreesPerMillimeter from '../domain/measurements/degreesPerMillimeter';
import InchesPerRevolution from '../domain/measurements/inchesPerRevolution';
import Measurement from '../domain/measurements/measurement';

class Converter {
  private _supportedGameSettings = [
    GameSettings.apexLegends(),
    GameSettings.counterStrikeGlobalOffensive(),
    GameSettings.fortniteConfig(),
    GameSettings.fortniteSlider(),
    GameSettings.overwatch(),
    GameSettings.quake(),
    GameSettings.rainbowSixSiege(),
    GameSettings.reflex(),
    GameSettings.source(),
    GameSettings.valorant(),
  ];

  private _supportedMeasurements = [
    new CentimetersPerRevolution(),
    new DegreesPerMillimeter(),
    new InchesPerRevolution(),
  ];

  private _findGameSettings(selectedAlias: string): GameSettings | undefined {
    return this._supportedGameSettings.find((gameSetting) =>
      gameSetting.aliases.some((alias) => alias === selectedAlias)
    );
  }

  private _findMeasurement(selectedAlias: string): Measurement | undefined {
    return this._supportedMeasurements.find((measurement) =>
      measurement.aliases.some((alias) => alias === selectedAlias)
    );
  }

  private _getTrueSensitivity(input: number, selectedAlias: string, cpi: number): number {
    const selectedGameSetting = this._findGameSettings(selectedAlias);

    let trueSenstivity;

    if (selectedGameSetting) {
      trueSenstivity = selectedGameSetting.convertToTrueSensitivity(input);
    } else {
      const selectedMeasurement = this._findMeasurement(selectedAlias);

      if (!selectedMeasurement) {
        throw new Error(`The unit, \`${selectedAlias}\` isn't supported`);
      }

      trueSenstivity = selectedMeasurement.convertToTrueSensitivity(cpi, input);
    }

    return trueSenstivity;
  }

  public convert(input: number, from: string, to: string, cpi: number, decimals: number): string {
    const fromGameSetting = this._findGameSettings(from);
    const fromMeasurement = this._findMeasurement(from);
    const toGameSetting = this._findGameSettings(to);
    const toMeasurement = this._findMeasurement(to);

    if (!fromGameSetting && !fromMeasurement) {
      throw new Error(`The unit, \`${from}\` isn't supported`);
    }

    if (!toGameSetting && !toMeasurement) {
      throw new Error(`The unit, \`${to}\` isn't supported`);
    }

    const fromTrueSenstivity = this._getTrueSensitivity(input, from, cpi);

    let conversion = -1;
    let result = '';

    if (fromMeasurement || toMeasurement) {
      result = `Using ${cpi} CPI, `;
    }

    result += `${input} ${
      fromGameSetting ? `in ${fromGameSetting.name}` : fromMeasurement?.name
    } is approximately `;

    if (toGameSetting) {
      conversion = toGameSetting.convertFromTrueSensitivity(fromTrueSenstivity);
    } else {
      conversion = (toMeasurement as Measurement).convertFromTrueSensitivity(
        cpi,
        fromTrueSenstivity
      );
    }

    conversion = round(conversion, decimals);

    result += `${conversion} ${toGameSetting ? `in ${toGameSetting.name}` : toMeasurement?.name}`;

    return result;
  }

  public getSupportedUnits(): string[] {
    const supportedGameSettingsAliases = this._supportedGameSettings
      .map((gameSettings) => gameSettings.aliases)
      .reduce((prevVal: string[], currVal: string[]) => prevVal.concat(currVal), []);

    const supportedMeasurementAliases = this._supportedMeasurements
      .map((measurement) => measurement.aliases)
      .reduce((prevVal: string[], currVal: string[]) => prevVal.concat(currVal), []);

    return supportedGameSettingsAliases.concat(supportedMeasurementAliases);
  }
}

export default Converter;
