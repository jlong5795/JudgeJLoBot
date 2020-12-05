module.exports = {
    name: 'hello',
    aliases: ['greet', 'greeting'],
    description: 'Greetings!',
    args: false,
    execute(message, args) {
        message.channel.send(`Hello, ${message.author}`);
    }
  }