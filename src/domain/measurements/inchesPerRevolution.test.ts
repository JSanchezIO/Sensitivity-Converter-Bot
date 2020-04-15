import InchesPerRevolution from './inchesPerRevolution';

describe('inchesPerRevolution', () => {
  it('creates in/rev measurement', () => {
    const result = new InchesPerRevolution();

    expect(result.aliases).toEqual(['in/rev']);
    expect(result.name).toBe('in/rev');
  });

  it.each([
    [800, 0.0066, 68.1818181818182],
    [800, 0.5555, 0.81008100810081],
    [800, 0.022, 20.4545454545455],
  ])(
    'converts from true sensitivity',
    (cpi: number, trueSensitivity: number, expectedResult: number) => {
      const measurementProfile = new InchesPerRevolution();

      const result = measurementProfile.convertFromTrueSensitivity(cpi, trueSensitivity);

      expect(result).toBeCloseTo(expectedResult, 4);
    }
  );

  it.each([
    [800, 68.1818181818182, 0.0066],
    [800, 0.81008100810081, 0.5555],
    [800, 20.4545454545455, 0.022],
  ])(
    'converts to true sensitivity',
    (cpi: number, trueSensitivity: number, expectedResult: number) => {
      const measurementProfile = new InchesPerRevolution();

      const result = measurementProfile.convertToTrueSensitivity(cpi, trueSensitivity);

      expect(result).toBeCloseTo(expectedResult, 4);
    }
  );
});
