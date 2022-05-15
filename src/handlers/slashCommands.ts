import ExtendedClient from "../classes/ExtendedClient";
import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { token, clientId, guildId } from "../../config.json";
import colors from "colors";
colors.enable();
import { AsciiTable3, AlignmentEnum } from "ascii-table3";
let table = new AsciiTable3("SlashCommands");
table.setHeading("SlashCommand", "Status");
table.setAlign(3, AlignmentEnum.CENTER);
import path from "path";
import slashCommand from "../typings/slashCommand";
module.exports = async (client: ExtendedClient) => {
  try {
    const mainDir = `${__dirname}`;
    const dir = `${path.dirname(mainDir)}`;
    const commands: Array<Object> = [];
    const commandDir = `${dir}/slashCommands`;
    readdirSync(commandDir).forEach((dir) => {
      const commandFile = readdirSync(`${commandDir}/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
      for (let file of commandFile) {
        let pull: Object = require(`${commandDir}/${dir}/${file}`);
        const slashCmd: Array<Object> = Object.values(pull);
        //@ts-ignore
        slashCmd.map(async (cmd: slashCommand) => {
          client.slashCommands.set(cmd.data.name, cmd);
          commands.push(cmd.data.toJSON());
        });
      }
    });
    const rest = new REST({ version: "9" }).setToken(token);
    try {
      guildId.map(async (guildIds) => {
        await rest.put(Routes.applicationGuildCommands(clientId, guildIds), {
          body: commands,
        });
        console.log(
          `Successfully registered commands for the guilds with ids ${guildIds}`
        );
      });
    } catch (error) {
      console.log(error);
    }
  } catch (e) {
    console.log(String(e).bgRed);
  }
};
