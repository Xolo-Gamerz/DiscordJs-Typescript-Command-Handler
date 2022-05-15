import { Collection, CommandInteraction } from "discord.js";
import ExtendedClient from "../../classes/ExtendedClient";
import slashCommand from "../../typings/slashCommand";

module.exports = {
  name: "interactionCreate",
  execute: async (interaction: CommandInteraction, client: ExtendedClient) => {
    if (!interaction.isCommand()) {
      return;
    }
    const command = client.slashCommands.get(
      interaction.commandName
    ) as slashCommand;
    if (!command) {
      return;
    }
    try {
      command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command",
        ephemeral: true,
      });
    }
  },
};
