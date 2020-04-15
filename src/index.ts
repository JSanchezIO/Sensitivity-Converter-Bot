import DiscordClient from './discord/discordClient';

const discordClient = new DiscordClient();

discordClient.start(process.env.AUTH_TOKEN as string);
