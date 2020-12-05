module.exports = {
    name: 'hello',
    description: 'Greetings!',
    execute(message, args) {
        message.channel.send(`Hello, ${message.author}`);
    }
  }