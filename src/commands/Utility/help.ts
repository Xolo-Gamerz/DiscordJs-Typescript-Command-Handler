import { MessageEmbed, Permissions } from "discord.js";
import command from "../../typings/command";
const helpLegacyCommand: command = {
  name: "help",
  aliases: ["holp", "h"],
  description: "Provides the help menu",
  usage: `help <commandName>`,
  cooldown: 2,
  category: "Utility",
  permission: [`${Permissions.FLAGS.VIEW_CHANNEL}`],
  execute: async (client, message, args, prefix) => {
    const commands = client?.commands;
    const categories = client.categories;
    if (args[0]) {
      const cmd =
        client.commands.get(args[0]) ||
        client.commands.get(`${client.aliases.get(args[0])}`);
      if (!cmd) {
        const embed = new MessageEmbed();
        embed
          .setDescription(
            `No such information found for command **${args[0]}**`
          )
          .setFooter({
            text: `Use ${prefix}help for a list of all commands `,
          })
          .setColor("RED");
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name)
          embed.setTitle(`Detailed Information about: \`${cmd.name}\``);
        if (cmd.description)
          embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases)
          embed.addField(
            "**Aliases**",
            `\`${cmd.aliases.map((aliase) => `${aliase}`).join("`, `")}\``
          );
        if (cmd.usage) embed.addField(`**Usage**`, `\`${prefix}${cmd.usage}\``);
        message.channel.send({ embeds: [embed] });
      }
    } else {
      const filterCommands = (category: string) => {
        return commands
          .filter((cmd) => cmd.category === category)
          .map((cmd) => `${cmd.name}`);
      };
      const embed = new MessageEmbed()
      embed
      .setAuthor({
        name: `HELP MENU 🔰`
      })
      .setTitle("Home Menu")
      .setColor("BLURPLE")
      .setThumbnail(`${client.user?.displayAvatarURL()}`)
      .setFooter({
        text:`To see command Descriptions and Information, type: ${prefix}help <commandName>`,
      })
      categories.map((category) => {
        const cmds = filterCommands(category)
        embed.addField(`**${category}**`, `\>\ \`${cmds.join(", ")}\``)
      });
      message.channel.send({embeds:[embed]})
    }
  },
};
module.exports = {
  helpLegacyCommand,
};
