import ExtendedClient from "../../classes/ExtendedClient";
module.exports = {
  name: "ready",
  once: true,
  execute: (client: ExtendedClient) => {
    console.log(`Client: ${client.user?.tag} has logged in`);
    client.user?.setActivity(`My development Build`,{type:`WATCHING`})
    client.user?.setStatus(`idle`)
  },
};
