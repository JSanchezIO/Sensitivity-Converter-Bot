import { chain } from 'mathjs';
import Measurement from './measurement';

class DegreesPerMillimeter extends Measurement {
  public constructor() {
    super('deg/mm');
  }

  public convertFromTrueSensitivity(cpi: number, trueSensitivity: number): number {
    // deg/mm = (trueSensitivity * cpi) / 25.4

    return chain(trueSensitivity).multiply(cpi).divide(25.4).done();
  }

  public convertToTrueSensitivity(cpi: number, measurementSensitivity: number): number {
    // trueSensitivity = (deg/mm * 25.4) / cpi

    return chain(measurementSensitivity).multiply(25.4).divide(cpi).done();
  }
}

export default DegreesPerMillimeter;
