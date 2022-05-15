import {Message } from "discord.js";
import ExtendedClient from "../../classes/ExtendedClient";
import command from "../../typings/command";
import {prefix} from "../../../config.json"
module.exports = {
  name: "messageCreate",
  execute: async (message: Message, client: ExtendedClient) => {
    if (!message.guild || !message.channel || message.author.bot) {
      return;
    }
    if (message.channel.partial) {
      await message.channel.fetch();
    }
    if (message.partial) {
      await message.fetch();
    }
    if (message.content.startsWith(prefix)) {
      let string : string = ""
      let boolean : boolean = false
      const args = message.content.slice(prefix.length).trim().split(" ");
      const commandName = args.shift()?.toLowerCase() ?? string
      const aliaseCmd = client.commands.find(
        (cmd) =>
        //@ts-ignore
          cmd?.aliases && cmd?.aliases.includes(commandName)
      )as command
      if (!client.commands.has(commandName) && !aliaseCmd) {
        return;
      }
      const mainCmd: command =
        client.commands?.get(commandName) ||
        (client.commands?.get(aliaseCmd.name) as command);

      try {
        mainCmd.execute(client, message, args , prefix);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
