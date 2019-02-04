import { IResult } from "./iresult";

/**
 * An action that can be performed by the bot.
 */
export interface IAction {
    /**
     * The name of the command the action can respond to.
     */
    readonly command: string;

    /**
     * The method that will execute the action.
     */
    exec: (request: string) => IResult
}