module.exports = Basics = {
  pingPong,
};

function pingPong(msg, arg = null) {
  if (arg === null) {
    return msg.reply(`Pong!`);
  } else {
    return msg.reply(`Pong! ${arg}`);
  }
}
