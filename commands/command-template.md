module.exports = {
    name: 'command',
    description: 'Command description goes here',
    aliases: ['array of aliases for command'],
    usage: '<command name> <required args>',
    cooldown: <value>,
    args: boolean,
    execute(message, args) {
        // command logic
    }
}