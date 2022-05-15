import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction } from "discord.js";
import ExtendedClient from "../classes/ExtendedClient";

interface slashCommand {
  data: SlashCommandBuilder;
  category : string
  permission : string[]
  usage? : string,
  guildOnly? : boolean,
  execute: (interaction: CommandInteraction, client?: ExtendedClient) => unknown | void
}

export default slashCommand;
