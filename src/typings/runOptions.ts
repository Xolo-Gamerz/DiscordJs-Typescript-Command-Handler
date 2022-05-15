import { Message } from "discord.js";
import ExtendedClient from "../classes/ExtendedClient";

type legacyRunFunction = (
  client: ExtendedClient,
  message: Message,
  args: Array<string>,
  prefix: string
) => void | unknown;

export { legacyRunFunction };
