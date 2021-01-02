module.exports = {
    name: 'hello',
    aliases: ['greet', 'greeting'],
    description: 'Greetings!',
    args: false,
    execute(message, args, client) {
        message.channel.send(`Hello, ${message.author}`);
    }
  }