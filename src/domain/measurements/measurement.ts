import Result from '../abstractions/result';

abstract class Measurement {
  private _aliases: string[] = [];

  private _name: string;

  protected constructor(name: string) {
    this._name = name;
    this.setAliases([name]);
  }

  private setAliases(aliases: string[]) {
    if (!aliases || !aliases.length) {
      return Result.fail('At least one alias is required');
    }

    const cleanAliases = aliases
      .map((alias) => alias.replace(/ /g, '-').toLowerCase().trim())
      .filter((alias) => Boolean(alias));

    this._aliases = cleanAliases;

    return Result.ok();
  }

  public get aliases() {
    return this._aliases;
  }

  public get name() {
    return this._name;
  }

  public abstract convertFromTrueSensitivity(cpi: number, trueSensitivity: number): number;

  public abstract convertToTrueSensitivity(cpi: number, measurementSensitivity: number): number;
}

export default Measurement;
