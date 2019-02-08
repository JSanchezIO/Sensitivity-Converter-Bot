/**
 * The arguments available for the `convert` action.
 */
export interface IConvertArgs {
  /**
   * The CPI (DPI) of the target mouse.
   */
  cpi: number;

  /**
   * The amount of decimal places requested.
   */
  decimals: number;

  /**
   * The input sensitivity metric.
   */
  from: string;

  /**
   * Prints the help message.
   */
  help: boolean;

  /**
   * Prints the result publically.
   */
  public: boolean;

  /**
   * The sensitivity in the from metric.
   */
  sensitivity: number;

  /**
   * The output sensitivity metric.
   */
  to: string;

  /**
   * Prints the available metrics.
   */
  units: boolean;

  /**
   * Prints example usage statements.
   */
  usage: boolean;

  /**
   * The current version.
   */
  version: boolean;
}
