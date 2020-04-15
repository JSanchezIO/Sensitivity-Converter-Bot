import { chain, divide, multiply } from 'mathjs';
import Measurement from './measurement';

class CentimetersPerRevolution extends Measurement {
  public constructor() {
    super('cm/rev');
  }

  public convertFromTrueSensitivity(cpi: number, trueSensitivity: number): number {
    // cm/rev = 2.54 * 360 / (trueSensitivty * cpi)

    return chain(360).divide(multiply(trueSensitivity, cpi)).multiply(2.54).done();
  }

  public convertToTrueSensitivity(cpi: number, measurementSensitivity: number): number {
    // trueSensitivity = 360 / ((in/rev / 2.54) * cpi)

    return chain(360)
      .divide(multiply(divide(measurementSensitivity, 2.54), cpi))
      .done();
  }
}

export default CentimetersPerRevolution;
