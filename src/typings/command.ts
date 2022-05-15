import { PermissionResolvable } from "discord.js";
import { legacyRunFunction } from "./runOptions";

interface command{
    name: string,
    aliases?: string[],
    description?: string,
    cooldown? : number,
    category: string,
    usage?: string,
    permission? : Array<PermissionResolvable>,
    execute: legacyRunFunction
}

export default command