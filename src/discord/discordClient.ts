import { Client } from 'discord.js';
import { ILogger } from '../domain/abstractions';
import ConsoleLogger from '../infrastructure/consoleLogger';
import Parser from './parser';

class DiscordClient {
  private readonly _client: Client;

  private readonly _logger: ILogger;

  private readonly _parser: Parser;

  constructor() {
    this._client = new Client();
    this._logger = new ConsoleLogger();
    this._parser = new Parser();
    this._initializeClient();
  }

  private _initializeClient() {
    this._client.on('message', (message) => {
      const request: string = message.content.toLowerCase();
      const command: string = request.split(/ +/)[0];

      if (!command || !this._parser.aliases.some((alias) => command === `/${alias}`)) {
        return;
      }

      const result = this._parser.execute(request);
      const prefix = `\n\nREQUEST: ${message.id}\n${request}\n`;

      if (result.deleteRequest && message.deletable) {
        message
          .delete()
          .then(() => {
            this._logger.log(`${prefix}Successfully deleted message!`);
          })
          .catch((err) => {
            this._logger.error(`${prefix}Failed to delete message!`, err);
          });
      }

      if (!result.messages || !result.messages.length) {
        return;
      }

      const { length } = result.messages;

      if (result.sendPrivately) {
        result.messages.forEach((msg, idx) => {
          message.author
            .send(msg)
            .then(() => {
              this._logger.log(`${prefix}Successfully sent message ${idx + 1} of ${length}`);
            })
            .catch((err) => {
              this._logger.error(`${prefix}Failed to send message ${idx + 1} of ${length}`, err);
            });
        });
      } else {
        result.messages.forEach((msg, idx) => {
          message.channel
            .send(msg)
            .then(() => {
              this._logger.log(`${prefix}Successfully sent message ${idx + 1} of ${length}`);
            })
            .catch((err) => {
              this._logger.error(`${prefix}Failed to send message ${idx + 1} of ${length}`, err);
            });
        });
      }
    });
  }

  public start(authorizationToken: string): Promise<void> {
    if (!process.env.AUTH_TOKEN) {
      this._logger.error('An authorization token is required');
      process.exit(-1);
    }

    return this._client
      .login(authorizationToken)
      .then(() => this._logger.log(`Online at ${new Date().toUTCString()}`), this._logger.error);
  }
}

export default DiscordClient;
