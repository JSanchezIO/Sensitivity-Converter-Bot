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

  const actionFiles: string[] = readdirSync(resolve(__dirname, 'actions')).filter(file => file.includes('.js'));

  let result: IResult | undefined;

  for (const actionFile of actionFiles) {
    const Action: any = require(`./actions/${actionFile}`).default;
    const action: IAction = createAction(Action, logger);

    if (command === `/${action.command}` || action.aliases.some(alias => command === `/${alias}`)) {
      result = action.exec(request);
      break;
    }
  }

  if (result === undefined || result === null) {
    return;
  }

  const prefix = `REQUEST: ${message.id}\n`;

  if (result.deleteRequest && message.deletable) {
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

  const length: number = result.messages.length;

  if (result.sendPrivately) {
    result.messages.forEach((msg, idx) => {
      message.author
        .send(msg)
        .then(() => {
          logger.log(prefix + `Successfully sent message ${idx + 1} of ${length}`);
        })
        .catch(() => {
          logger.error(prefix + `Failed to send message ${idx + 1} of ${length}`);
        });
    });
  } else {
    result.messages.forEach((msg, idx) => {
      message.channel
        .send(msg)
        .then(() => {
          logger.log(prefix + `Successfully sent message ${idx + 1} of ${length}`);
        })
        .catch(() => {
          logger.error(prefix + `Failed to send message ${idx + 1} of ${length}`);
        });
    });
  }
});

client.login(process.env.AUTH_TOKEN).then(() => {
  logger.log('Online');
}, logger.error);
