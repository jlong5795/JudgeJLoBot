require("dotenv").config();

// library imports
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const PREFIX = "!";

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection with the key as the cmd name and value as exported module
  client.commands.set(command.name, command);
}


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
  // ignores message inputs from the bot itself
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // List of potential commands
  switch (command) {
    case "ping":
      client.commands.get("ping").execute(message, args);
    default:
      return message.reply("Command not found. Please try again");
  }
});

// bot login
client.login(process.env.BOT_TOKEN);
