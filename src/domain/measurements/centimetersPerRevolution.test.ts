import CentimetersPerRevolution from './centimetersPerRevolution';

describe('centimetersPerRevolution', () => {
  it('creates cm/rev measurement', () => {
    const result = new CentimetersPerRevolution();

    expect(result.aliases).toEqual(['cm/rev']);
    expect(result.name).toBe('cm/rev');
  });

  it.each([
    [800, 0.0066, 173.181818181818],
    [800, 0.5555, 2.05760576057606],
    [800, 0.022, 51.9545454545455],
  ])(
    'converts from true sensitivity',
    (cpi: number, trueSensitivity: number, expectedResult: number) => {
      const measurementProfile = new CentimetersPerRevolution();

      const result = measurementProfile.convertFromTrueSensitivity(cpi, trueSensitivity);

      expect(result).toBeCloseTo(expectedResult, 4);
    }
  );

  it.each([
    [800, 173.181818181818, 0.0066],
    [800, 2.05760576057606, 0.5555],
    [800, 51.9545454545455, 0.022],
  ])(
    'converts to true sensitivity',
    (cpi: number, measurementSensitivity: number, expectedResult: number) => {
      const measurementProfile = new CentimetersPerRevolution();

      const result = measurementProfile.convertToTrueSensitivity(cpi, measurementSensitivity);

      expect(result).toBeCloseTo(expectedResult, 4);
    }
  );
});
