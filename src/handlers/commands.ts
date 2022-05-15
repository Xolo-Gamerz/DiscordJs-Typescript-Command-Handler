import { readdirSync } from "fs";
import ExtendedClient from "../classes/ExtendedClient";
import colors from "colors";
colors.enable();
import { AsciiTable3, AlignmentEnum } from "ascii-table3";
let table = new AsciiTable3("Commands");
table.setHeading("Command", "Status");
table.setAlign(3, AlignmentEnum.CENTER);
import path from "path";
import command from "../typings/command";
module.exports = (client: ExtendedClient) => {
  try {
    let amount = 0;
    const mainDir = `${__dirname}`;
    const dir = `${path.dirname(mainDir)}`;
    const commandDir = `${dir}/commands`;
    readdirSync(commandDir).forEach(async (dir) => {
      const commands = readdirSync(`${commandDir}/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );
      for (let file of commands) {
        let pull: Object = require(`${commandDir}/${dir}/${file}`);
        const commandName: Array<Object> = Object.values(pull);
        //@ts-ignore
        commandName.map(async (cmd: command) => {
          if (cmd.name) {
            client.commands.set(cmd.name, cmd);
            table.addRowMatrix([[file, "Ready"]]);
            amount = amount++;
          } else {
            table.addRowMatrix([
              [
                file.green,
                "Error -> Missing a help.name, or help.name is not a string"
                  .red,
              ],
            ]);
          }
          if (cmd.aliases && Array.isArray(cmd.aliases)) {
            cmd.aliases.forEach((aliase) => {
              client.aliases.set(aliase, cmd.name);
            });
          }
        }) as unknown as command;
      }
    });
    console.log(table.toString().yellow);
  } catch (e) {
    console.log(String(e).bgRed);
  }
};
