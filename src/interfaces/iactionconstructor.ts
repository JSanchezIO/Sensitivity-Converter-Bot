import { ILogger } from "./ilogger";

export interface IActionConstructor {
    /**
     * Constructs an IAction and provides an ILogger for use.
     */
    new (logger: ILogger);
}