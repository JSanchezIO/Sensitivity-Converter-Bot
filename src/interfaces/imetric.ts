import { MathType } from 'mathjs';

export interface IMetric {
  /**
   * The aliases, if any, of the metric.
   */
  aliases: string[];

  /**
   * The name and any aliases of the metric
   */
  name: string;

  /**
   * The yaw, if any, of the metric
   */
  yaw: MathType;
}
