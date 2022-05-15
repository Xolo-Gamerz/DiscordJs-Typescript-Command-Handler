import { Client, Collection, Intents } from "discord.js";
import command from "../typings/command";
import slashCommand from "../typings/slashCommand";

class ExtendedClient extends Client{
    commands: Collection<string, command> = new Collection();
    slashCommands : Collection<string, slashCommand> = new Collection()
    events : Collection<any, unknown> = new Collection()
    aliases : Collection<any, unknown> = new Collection()
    cooldown : Collection<any, unknown> = new Collection()
    categories : Array<string> = new Array()
    slashCategories : Array<string> = new Array()
    constructor(){
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
              ],
              restTimeOffset: 0,
              shards: "auto",
              partials: ["MESSAGE", "CHANNEL", "USER", "REACTION"],
        })
    }

}

export default ExtendedClient