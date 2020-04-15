import Converter from './converter';

describe('Converter', () => {
  it.each([
    [55, 'cm/rev', 'in/rev', 800, 5, 'Using 800 CPI, 55 cm/rev is approximately 21.65354 in/rev'],
    [1, 'cs', 'cm/rev', 800, 5, 'Using 800 CPI, 1 in CS:GO is approximately 51.95455 cm/rev'],
    [55, 'cm/rev', 'cs', 800, 5, 'Using 800 CPI, 55 cm/rev is approximately 0.94463 in CS:GO'],
    [0.94463, 'cs', 'valorant', 800, 5, '0.94463 in CS:GO is approximately 0.29688 in Valorant'],
    [1, 'cs', 'fn', 800, 5, '1 in CS:GO is approximately 0.0099 in Fortnite Config'],
  ])(
    'converts properly',
    (
      input: number,
      from: string,
      to: string,
      cpi: number,
      decimals: number,
      expectedResult: string
    ) => {
      const target = new Converter();

      const result = target.convert(input, from, to, cpi, decimals);

      expect(result).toBe(expectedResult);
    }
  );
});
