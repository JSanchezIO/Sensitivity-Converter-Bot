/* eslint-disable no-console */

if (process.env.AUTH_TOKEN === undefined || process.env.AUTH_TOKEN === null || process.env.AUTH_TOKEN === '') {
  console.log('You must specify an "AUTH_TOKEN"');
  process.exit(-1);
}

require('./utilities/polyfills');

const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Discord.Client();

client.on('message', message => {
  const request = message.content.toLowerCase();
  const commandRequest = request.split(/ +/)[0];

  if (commandRequest === undefined || commandRequest === null || commandRequest === '') {
    return;
  }

  const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

  let messages;

  for (const commandFile of commandFiles) {
    const Command = require(`./commands/${commandFile}`);
    const command = new Command();

    if (commandRequest === command.name) {
      messages = command.exec(request.substr(command.name.length + 1));
      break;
    }
  }

  if (messages === undefined || messages === null || messages === '' || messages.length < 1) {
    return;
  }

  if (!Array.isArray(messages)) {
    messages = [messages];
  }

  for (const msg of messages) {
    message.author.send(msg).then(() => {
      return;
    }, console.log);
  }

  message.delete().then(() => {
    return;
  }, console.log);
});

client.login(process.env.AUTH_TOKEN).then(() => {
  console.log('Online');
}, console.log);
