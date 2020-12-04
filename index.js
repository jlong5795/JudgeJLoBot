const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (msg.content.startsWith("!")) {
      const command = msg.content.slice(1)
    if (command === "ping") {
      msg.reply("Pong!");
    }
  }
});
