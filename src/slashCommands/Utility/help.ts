import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder,PermissionsBitField } from "discord.js";
import slashCommand from "../../typings/slashCommand";

const helpSlashCommand: slashCommand = {
  data: new SlashCommandBuilder()
    .setName("help")
    .addStringOption((option) =>
      option
        .setName(`command`)
        .setDescription(`The command to check`)
        .setRequired(false)
    )
    .setDescription("Provides the help menu"),
  category: "Utility",
  permission: [`${PermissionsBitField.Flags.ViewChannel}`],
  guildOnly: true,
  usage: `help <commandName>`,
  execute: async (interaction, client) => {
    const commands = client?.slashCommands;
    const categories = client?.slashCategories;
    const option = interaction.options.getString("cmd")
    if (option) {
      const cmd = client?.slashCommands.get(option);
      if (!cmd) {
        const embed = new EmbedBuilder();
        embed
          .setDescription(`No such information found for command **${option}**`)
          .setFooter({
            text: `Use /help for a list of all commands `,
          })
          .setColor("Red");
        interaction.reply({ embeds: [embed] });
        return;
      }
      const embed = new EmbedBuilder()
      embed
      .setColor("Random")
      .addFields({name:"**Command name**", value:`\`${cmd.data.name}\``})
      .addFields({name:"**Description**",value: `\`${cmd.data.description}\``})
      .setTitle(`Detailed Information about: \`${cmd.data.name}\``)
      if(cmd.usage){
        embed.addFields({name:`**Usage**`, value:`\`/${cmd.usage}\``})
      }
    interaction.reply({embeds:[embed]})
    return;
    }
    const filterCommands = (category : string)=>{
      return commands 
              ?.filter((cmd)=>cmd.category === category)
              ?.map((cmd)=>`${cmd.data.name}`)
    }
    const embed = new EmbedBuilder()
      embed
      .setAuthor({
        name: `HELP MENU 🔰`
      })
      .setTitle("Home Menu")
      .setColor("Blurple")
      .setThumbnail(`${client?.user?.displayAvatarURL()}`)
      .setFooter({
        text:`To see command Descriptions and Information, use: /help <commandName>`,
      })
      categories?.map((category)=>{
        const cmds = filterCommands(category)
        embed.addFields({name:`**${category}**`,value: `\>\ \`${cmds?.join(", ")}\``})
      })
      interaction.reply({embeds:[embed]})
  },
};
module.exports = {
  helpSlashCommand,
};
