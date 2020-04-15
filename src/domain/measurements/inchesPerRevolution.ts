import { chain, multiply } from 'mathjs';
import Measurement from './measurement';

class InchesPerRevolution extends Measurement {
  public constructor() {
    super('in/rev');
  }

  public convertFromTrueSensitivity(cpi: number, trueSensitivity: number): number {
    // in/rev = 360 / (trueSensitivity * cpi)

    return chain(360).divide(cpi).divide(trueSensitivity).done();
  }

  public convertToTrueSensitivity(cpi: number, measurementSensitivity: number): number {
    // trueSensitivity = 360 / (in/rev * cpi)

    return chain(360).divide(multiply(measurementSensitivity, cpi)).done();
  }
}

export default InchesPerRevolution;
