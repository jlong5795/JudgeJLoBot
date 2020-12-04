const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

// function imports
const Basics = require("./basics");
const Users = require("./users");

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (msg.content.startsWith("!")) {
    const args = msg.content.split(" ");
    const command = args[0].toLowerCase();
    let arg = ''
    if (args.length > 1) {
        arg = args[1];
    }

    // List of potential commands
    switch (command) {
      case "!ping":
        return Basics.pingPong(msg, arg);
      case "!info":
        return Users.info(client, msg, arg);
      default:
        console.log("Command not found");
    }
  }
});
