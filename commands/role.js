const { Role } = require("discord.js");

module.exports = {
    name: 'role',
    description: "Let's a user add a role to themselves",
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
        return message.channel.send('In the future this will let you add a role to yourself.')
    }
}