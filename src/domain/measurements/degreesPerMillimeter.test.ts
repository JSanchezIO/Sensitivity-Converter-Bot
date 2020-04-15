import DegreesPerMillimeter from './degreesPerMillimeter';

describe('degreesPerMillimeter', () => {
  it('creates deg/mm measurement', () => {
    const result = new DegreesPerMillimeter();

    expect(result.aliases).toEqual(['deg/mm']);
    expect(result.name).toBe('deg/mm');
  });

  it.each([
    [800, 0.0066, 0.207874015748032],
    [800, 0.5555, 17.496062992126],
    [800, 0.022, 0.692913385826772],
  ])(
    'converts from true sensitivity',
    (cpi: number, trueSensitivity: number, expectedResult: number) => {
      const measurementProfile = new DegreesPerMillimeter();

      const result = measurementProfile.convertFromTrueSensitivity(cpi, trueSensitivity);

      expect(result).toBeCloseTo(expectedResult, 4);
    }
  );

  it.each([
    [800, 0.207874015748032, 0.0066],
    [800, 17.496062992126, 0.5555],
    [800, 0.692913385826772, 0.022],
  ])(
    'converts to true sensitivity',
    (cpi: number, trueSensitivity: number, expectedResult: number) => {
      const measurementProfile = new DegreesPerMillimeter();

      const result = measurementProfile.convertToTrueSensitivity(cpi, trueSensitivity);

      expect(result).toBeCloseTo(expectedResult, 4);
    }
  );
});
