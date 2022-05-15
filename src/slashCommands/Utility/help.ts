import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, Permissions } from "discord.js";
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
  permission: [`${Permissions.FLAGS.SEND_MESSAGES}`],
  guildOnly: true,
  usage: `help <commandName>`,
  execute: async (interaction, client) => {
    const commands = client?.slashCommands;
    const categories = client?.slashCategories;
    const option = interaction.options.getString("cmd");
    if (option) {
      const cmd = client?.slashCommands.get(option);
      if (!cmd) {
        const embed = new MessageEmbed();
        embed
          .setDescription(`No such information found for command **${option}**`)
          .setFooter({
            text: `Use /help for a list of all commands `,
          })
          .setColor("RED");
        interaction.reply({ embeds: [embed] });
        return;
      }
      const embed = new MessageEmbed()
      embed
      .setColor("RANDOM")
      .addField("**Command name**", `\`${cmd.data.name}\``)
      .addField("**Description**", `\`${cmd.data.description}\``)
      .setTitle(`Detailed Information about: \`${cmd.data.name}\``)
      if(cmd.usage){
        embed.addField(`**Usage**`, `\`/${cmd.usage}\``)
      }
    interaction.reply({embeds:[embed]})
    return;
    }
    const filterCommands = (category : string)=>{
      return commands 
              ?.filter((cmd)=>cmd.category === category)
              ?.map((cmd)=>`${cmd.data.name}`)
    }
    const embed = new MessageEmbed()
      embed
      .setAuthor({
        name: `HELP MENU 🔰`
      })
      .setTitle("Home Menu")
      .setColor("BLURPLE")
      .setThumbnail(`${client?.user?.displayAvatarURL()}`)
      .setFooter({
        text:`To see command Descriptions and Information, use: /help <commandName>`,
      })
      categories?.map((category)=>{
        const cmds = filterCommands(category)
        embed.addField(`**${category}**`, `\>\ \`${cmds?.join(", ")}\``)
      })
      interaction.reply({embeds:[embed]})
  },
};
module.exports = {
  helpSlashCommand,
};
