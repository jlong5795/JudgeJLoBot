module.exports = Basics = {
  commandList,
  pingPong,
};

function pingPong(msg, arg = null) {
  if (arg === null) {
    return msg.reply(`Pong!`);
  } else {
    return msg.reply(`Pong! ${arg}`);
  }
}

function commandList(msg) {
  return msg.channel.send({embed: {
    color: 3447003,
    title: "Command List:",
    fields: [
      { name: "Command Title", value: "commands\ninfo\nping", inline: true},
      { name: "Operation", value: "Returns a list of all bot commands\nWIP: Get a user's info\nReturns pong. Will ping a player's name if included after command", inline: true}
    ]
  }
})
}
