export interface ILogger {
  /**
   * Logs an error
   */
  error: (message: any, ...optionalParams: any[]) => void;

  /**
   * Logs an informational mesage
   */
  info: (message: any, ...optionalParams: any[]) => void;

  /**
   * Logs a message
   */
  log: (message: any, ...optionalParams: any[]) => void;

  /**
   * Logs a warning message
   */
  warn: (message: any, ...optionalParams: any[]) => void;
}
