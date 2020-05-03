import { divide, pi, multiply } from 'mathjs';
import Result from './abstractions/result';

class GameSettings {
  private _aliases: string[] = [];

  private _name: string;

  private _yaw: number;

  private constructor(name: string, yaw: number) {
    this._name = name;
    this._yaw = yaw;
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

  public convertFromTrueSensitivity(trueSensitivity: number): number {
    return divide(trueSensitivity, this._yaw);
  }

  public convertToTrueSensitivity(sensitivity: number): number {
    return multiply(this._yaw, sensitivity);
  }

  public static apexLegends() {
    const result = GameSettings.create('Apex Legends', 0.022);
    const gameSettings = result.value as GameSettings;

    gameSettings.setAliases(['apex', 'apex-legends']);

    return gameSettings;
  }

  public static create(name: string, yaw: number): Result<GameSettings> {
    const cleanName = name?.trim();

    if (!cleanName) {
      return Result.fail('A name is required');
    }

    const gameSettings = new GameSettings(name, yaw);

    return Result.ok(gameSettings);
  }

  public static callOfDutyModernWarfare() {
    const result = GameSettings.create('Call of Duty: Modern Warfare', 0.0066);
    const gameSettings = result.value as GameSettings;

    gameSettings.setAliases(['cod', 'mw']);

    return gameSettings;
  }

  public static counterStrikeGlobalOffensive() {
    const result = GameSettings.create('CS:GO', 0.022);
    const gameSettings = result.value as GameSettings;

    gameSettings.setAliases(['cs', 'csgo']);

    return gameSettings;
  }

  public static fortniteConfig() {
    const result = GameSettings.create('Fortnite Config', 2.222);
    const gameSettings = result.value as GameSettings;

    gameSettings.setAliases(['fn', 'fortnite', 'fortnite-config']);

    return gameSettings;
  }

  public static fortniteSlider() {
    const result = GameSettings.create('Fortnite Slider', 0.5555);
    const gameSettings = result.value as GameSettings;

    return gameSettings;
  }

  public static overwatch() {
    const result = GameSettings.create('Overwatch', 0.0066);
    const gameSettings = result.value as GameSettings;

    gameSettings.setAliases(['overwatch', 'ow']);

    return gameSettings;
  }

  public static quake() {
    const result = GameSettings.create('Quake', 0.022);
    const gameSettings = result.value as GameSettings;

    return gameSettings;
  }

  public static rainbowSixSiege() {
    const result = GameSettings.create('Rainbow Six Siege', divide(0.018, pi));
    const gameSettings = result.value as GameSettings;

    gameSettings.setAliases(['rainbow-six', 'r6', 'r-6', 'rsix', 'r-six', 'siege']);

    return gameSettings;
  }

  public static reflex() {
    const result = GameSettings.create('Reflex', divide(0.018, pi));
    const gameSettings = result.value as GameSettings;

    return gameSettings;
  }

  public static source() {
    const result = GameSettings.create('Source', 0.022);
    const gameSettings = result.value as GameSettings;

    return gameSettings;
  }

  public static valorant() {
    const result = GameSettings.create('Valorant', 0.07);
    const gameSettings = result.value as GameSettings;

    return gameSettings;
  }
}

export default GameSettings;
