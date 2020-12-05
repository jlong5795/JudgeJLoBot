const channelID = '529429373661741071'; //currently bot channel, needs to be updated to tickets channel
const check = '✅';

module.exports = {
    name: 'ticket',
    description: 'User submitted ticket',
    aliases: ['support'],
    usage: '<command name> <message>',
    cooldown: 10,
    args: true,
    execute(message, args) {
        const { guild, member } = message;
        let text = args.join(' ')

        const channel = guild.channels.cache.get(channelID);
        channel.send(`A new ticket has been created by <@${member.id}>
        "${text}"
        
        Click the ${check} icon when this issue is resolved.`)
        .then(message => {
            message.react(check)
        })
    }
}