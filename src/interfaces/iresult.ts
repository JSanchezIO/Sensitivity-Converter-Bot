/**
 * A result that contains information on how to handle requests and deliver results.
 */
export interface IResult {
  /**
   * Represents if the requesting message should be deleted.
   */
  deleteRequest: boolean;

  /**
   * The messages, if any, to respond with.
   */
  messages: string[];

  /**
   * Represents if the message should be sent privately.
   */
  sendPrivately: boolean;
}
