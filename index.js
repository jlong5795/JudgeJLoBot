require("dotenv").config();

// library imports
const fs = require("fs");
const Discord = require("discord.js");

// utility imports
const roleClaim = require('./utilities/role-claim');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const PREFIX = "!";

// bot login
client.login(process.env.BOT_TOKEN);

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection with the key as the cmd name and value as exported module
  client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);

  // roleclaim implementation
  roleClaim(client);
});

client.on("message", (message) => {
  // ignores message inputs from the bot itself
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  // check for commands that can only be executed in a Discord server (not DMs)
  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("I can't execute that command inside DMs!");
  }

  // check for commands that require additional arguments
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // cooldown check
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\ command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  // end cooldown logic

  // basic command handling
  try {
    command.execute(message, args, client);
  } catch (error) {
    console.log(error);
    message.reply("Error executing command. Please try again.");
  }
});
