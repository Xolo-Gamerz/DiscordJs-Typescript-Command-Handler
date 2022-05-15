import path from "path";
import { readdirSync } from "fs";
import colors from "colors";
colors.enable();
import ExtendedClient from "../classes/ExtendedClient";

interface Events{
  name: string,
  once?: boolean,
  execute: Function
}
module.exports = (client: ExtendedClient): void => {
  let amount = 0;
  const mainDir = `${__dirname}`;
  const dir = `${path.dirname(mainDir)}`;
  const eventDir = `${dir}/events`;
  readdirSync(eventDir).forEach((dir) => {
    const events: string[] = readdirSync(`${eventDir}/${dir}/`).filter(
      (file) => file.endsWith(".js")
    );
    for (let file of events) {
      let pull : Events = require(`${eventDir}/${dir}/${file}`);
      if (pull.once) {
        client.once(pull.name, (...args) => pull.execute(...args, client));
        amount = amount++;
      } else {
        client.on(pull.name, (...args) => pull.execute(...args, client));
      }
    }
  });
};
