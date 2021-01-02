// #open-tickets channel
const channelID = '784687661336100874'; 
const check = '✅';
let registered = false;

const registerEvent = client => {
    if (registered) return;

    registered = true;

    client.on('messageReactionAdd', (reaction, user) => {
        if (user.bot) return;

        const { message } = reaction;
        if (message.channel.id === channelID) {
            message.delete();
        }

    })
}

module.exports = {
    name: 'ticket',
    description: 'User submitted ticket',
    aliases: ['support'],
    usage: '<command name> <message>',
    cooldown: 10,
    args: true,
    execute(userMessage, args, client) {
        const { guild, member } = userMessage;
        let text = args.join(' ');

        registerEvent(client);

        const channel = guild.channels.cache.get(channelID);
        channel.send(`A new ticket has been created by <@${member.id}>
        "${text}"
        
        Click the ${check} icon when this issue is resolved.`)
        .then(ticketMessage => {
            ticketMessage.react(check)

            userMessage.reply('Your ticket has been sent. Please allow up to 24 hours for a reply.')
            userMessage.delete();
        })
    }
}