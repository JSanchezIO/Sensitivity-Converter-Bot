import { divide, pi } from 'mathjs';
import GameSettings from './gameSettings';

describe('GameSettings', () => {
  describe('Apex Legends', () => {
    it('creates game settings', () => {
      const result = GameSettings.apexLegends();

      expect(result.aliases).toEqual(['apex', 'apex-legends']);
      expect(result.name).toBe('Apex Legends');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.apexLegends();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.022);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.apexLegends();

      const actual = target.convertFromTrueSensitivity(0.022);

      expect(actual).toBe(1);
    });
  });

  describe('CS:GO', () => {
    it('creates game settings', () => {
      const result = GameSettings.counterStrikeGlobalOffensive();

      expect(result.aliases).toEqual(['cs', 'csgo']);
      expect(result.name).toBe('CS:GO');
      expect(result.convertToTrueSensitivity(1)).toBe(0.022);
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.apexLegends();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.022);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.apexLegends();

      const actual = target.convertFromTrueSensitivity(0.022);

      expect(actual).toBe(1);
    });
  });

  describe('Fortnite Config', () => {
    it('creates game settings', () => {
      const result = GameSettings.fortniteConfig();

      expect(result.aliases).toEqual(['fn', 'fortnite', 'fortnite-config']);
      expect(result.name).toBe('Fortnite Config');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.fortniteConfig();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(2.222);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.fortniteConfig();

      const actual = target.convertFromTrueSensitivity(2.222);

      expect(actual).toBe(1);
    });
  });

  describe('Fortnite Slider', () => {
    it('creates game settings', () => {
      const result = GameSettings.fortniteSlider();

      expect(result.aliases).toEqual(['fortnite-slider']);
      expect(result.name).toBe('Fortnite Slider');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.fortniteSlider();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.5555);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.fortniteSlider();

      const actual = target.convertFromTrueSensitivity(0.5555);

      expect(actual).toBe(1);
    });
  });

  describe('Overwatch', () => {
    it('creates game settings', () => {
      const result = GameSettings.overwatch();

      expect(result.aliases).toEqual(['overwatch', 'ow']);
      expect(result.name).toBe('Overwatch');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.overwatch();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.0066);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.overwatch();

      const actual = target.convertFromTrueSensitivity(0.0066);

      expect(actual).toBe(1);
    });
  });

  describe('Quake', () => {
    it('creates game settings', () => {
      const result = GameSettings.quake();

      expect(result.aliases).toEqual(['quake']);
      expect(result.name).toBe('Quake');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.quake();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.022);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.quake();

      const actual = target.convertFromTrueSensitivity(0.022);

      expect(actual).toBe(1);
    });
  });

  describe('Rainbow Six: Siege', () => {
    it('creates game settings', () => {
      const result = GameSettings.rainbowSixSiege();

      expect(result.aliases).toEqual(['rainbow-six', 'r6', 'r-6', 'rsix', 'r-six', 'siege']);
      expect(result.name).toBe('Rainbow Six Siege');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.rainbowSixSiege();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(divide(0.018, pi));
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.rainbowSixSiege();

      const actual = target.convertFromTrueSensitivity(divide(0.018, pi));

      expect(actual).toBe(1);
    });
  });

  describe('Reflex', () => {
    it('creates game settings', () => {
      const result = GameSettings.reflex();

      expect(result.aliases).toEqual(['reflex']);
      expect(result.name).toBe('Reflex');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.reflex();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(divide(0.018, pi));
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.reflex();

      const actual = target.convertFromTrueSensitivity(divide(0.018, pi));

      expect(actual).toBe(1);
    });
  });

  describe('Source', () => {
    it('creates game settings', () => {
      const result = GameSettings.source();

      expect(result.aliases).toEqual(['source']);
      expect(result.name).toBe('Source');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.source();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.022);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.source();

      const actual = target.convertFromTrueSensitivity(0.022);

      expect(actual).toBe(1);
    });
  });

  describe('Valorant', () => {
    it('creates game settings', () => {
      const result = GameSettings.valorant();

      expect(result.aliases).toEqual(['valorant']);
      expect(result.name).toBe('Valorant');
    });

    it('converts to true sensitivity', () => {
      const target = GameSettings.valorant();

      const actual = target.convertToTrueSensitivity(1);

      expect(actual).toBe(0.07);
    });

    it('converts from true sensitivity', () => {
      const target = GameSettings.valorant();

      const actual = target.convertFromTrueSensitivity(0.07);

      expect(actual).toBe(1);
    });
  });
});
