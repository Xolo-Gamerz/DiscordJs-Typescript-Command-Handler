import { Client, Collection,GatewayIntentBits,Partials } from "discord.js";
import command from "../typings/command";
import slashCommand from "../typings/slashCommand";
const {User,Message,Channel,Reaction} = Partials
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
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
              ],
              shards: "auto",
              partials: [User,Message,Channel,Reaction],
        })
    }

}

export default ExtendedClient