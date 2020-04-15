/* eslint-disable class-methods-use-this, no-console */

import chalk from 'chalk';
import { ILogger } from '../domain/abstractions';

class ConsoleLogger implements ILogger {
  public error(message: any, ...optionalParams: any[]) {
    console.error(chalk.red(message), ...optionalParams);
  }

  public info(message: any, ...optionalParams: any[]) {
    console.info(chalk.blue(message), ...optionalParams);
  }

  public log(message: any, ...optionalParams: any[]) {
    console.log(chalk.green(message), ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]) {
    console.warn(chalk.yellow(message), ...optionalParams);
  }
}

export default ConsoleLogger;
