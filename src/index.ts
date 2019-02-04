import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { IAction, IActionConstructor, ILogger, IResult } from './interfaces';
import { Logger } from './utilities';

const logger: ILogger = new Logger();

if (process.env.AUTH_TOKEN === undefined || process.env.AUTH_TOKEN === null || process.env.AUTH_TOKEN === '') {
  logger.error('You must specify an "AUTH_TOKEN"');
  process.exit(-1);
}

const client: Client = new Client();

const createAction = (ctor: IActionConstructor, log: ILogger): IAction => {
  return new ctor(log);
};

client.on('message', message => {
  const request: string = message.content.toLowerCase();
  const command: string = request.split(/ +/)[0];

  if (command === undefined || command === null || command === '') {
    return;
  }

  const actionFiles: string[] = readdirSync(resolve(__dirname, 'actions')).filter(file => file.includes('.ts'));

  let result: IResult | undefined;

  for (const actionFile of actionFiles) {
    const Action: any = require(`./actions/${actionFile}`);
    const action: IAction = createAction(Action, logger);

    if (command === `/${action.command}`) {
      result = action.exec(request);
      break;
    }
  }

  if (result === undefined || result === null) {
    return;
  }

  const prefix: string = `REQUEST: ${message.id}\n`;

  if (result.deleteRequest) {
    message
      .delete()
      .then(() => {
        logger.log(prefix + 'Successfully deleted message!');
      })
      .catch(() => {
        logger.error(prefix + 'Failed to delete message!');
      });
  }

  if (result.messages === undefined || result.messages === null || result.messages.length < 1) {
    return;
  }

  const method = result.sendPrivately ? message.author.send : message.channel.send;
  const length: number = result.messages.length;

  result.messages.forEach((msg, idx) => {
    method(msg)
      .then(() => {
        logger.log(prefix + `Successfully sent message ${idx} of ${length}`);
      })
      .catch(() => {
        logger.error(prefix + `Failed to send message ${idx} of ${length}`);
      });
  });
});
