import { Collection } from "discord.js";
import { readdirSync } from "fs";
import ExtendedClient from "./classes/ExtendedClient";
import { token, mongoDbToken } from "../config.json";
const client = new ExtendedClient();
client.commands = new Collection();
client.cooldown = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.categories = readdirSync(`${__dirname}/commands`);
client.slashCategories = readdirSync(`${__dirname}/slashCommands`)

const files: Array<String> = ["events", "commands", "slashCommands"];

files.filter(Boolean).forEach((file) => {
  require(`${__dirname}/handlers/${file}`)(client);
});

const login = async (token: string) => {
  await client.login(token);
};

login(token);
