const path = require("path");
const fs = require("fs");
// const legacyCommand = require("../schema/LegacyCommandSchema");
const mainDir = `${__dirname}`;
const { guildId, clientId } = require("../../config.json");
const token = process.env.TOKEN
// @ts-ignore
const dir = `${path.dirname(mainDir)}`;
const commandDir = `${dir}/slashCommands`;
let cmds = [];
fs.readdirSync(commandDir).forEach(async (dir) => {
  // @ts-ignore
  console.log(await prisma.slashCommand.findMany())
  const commands = fs
    .readdirSync(`${commandDir}/${dir}/`)
    .filter((file) => file.endsWith(".js"));
  for (let file of commands) {
    // console.log(file)
    let pull = require(`${commandDir}/${dir}/${file}`);
    let sls = Object.values(pull)
    // console.log(sls);
  // @ts-ignore
  sls.map(x=>console.log(x.data.name))
  }
});

