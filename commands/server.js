const Discord = require("discord.js");

module.exports = {
  name: "server",
  description: "Provides information about this Discord server",
  aliases: ["info", "serverinfo"],
  usage: "<command name>",
  cooldown: 10,
  execute(message, args, client) {
    const { guild } = message;
    const { name, region, memberCount, owner, afkTimeout } = guild;
    const icon = guild.iconURL();
    const ownerName = owner.user.tag;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for: ${name}`)
      .setThumbnail(icon)
      .addFields(
        {
          name: "Region",
          value: region,
        },
        {
          name: "Members",
          value: memberCount,
        },
        {
          name: "Owner",
          value: ownerName,
        },
        {
          name: "AFK Timout",
          value: afkTimeout / 60,
        }
      );

    message.channel.send(embed);
  },
};
