import { ILogger } from "./ilogger";

/**
 * Constructs an `IAction`
 */
export interface IActionConstructor {
    /**
     * Constructs an IAction and provides an ILogger for use.
     */
    new (logger: ILogger);
}