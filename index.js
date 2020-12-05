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
  // ignores message inputs from the bot itself
  if (msg.author.id === process.env.BOT_ID) return;

  if (msg.content.startsWith("!")) {
    const args = msg.content.split(" ");
    const command = args[0].toLowerCase();
    let arg = ''
    if (args.length > 1) {
        arg = args[1];
    }

    // List of potential commands
    switch (command) {
      case "!commands":
        return Basics.commandList(msg);
      case "!info":
        return Users.info(client, msg, arg);
      case "!ping":
        return Basics.pingPong(msg, arg);
      default:
        return msg.reply('Command not found. Please try again');
    }
  }
});
