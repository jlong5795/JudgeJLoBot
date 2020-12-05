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
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error);
    message.reply("Error executing command. Please try again.");
  }
});

// bot login
client.login(process.env.BOT_TOKEN);
