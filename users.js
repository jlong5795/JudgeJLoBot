module.exports = Users = {
    info
}

function info(client, msg, arg) {
    const user = client.guildMember
    console.log("🚀 ~ file: users.js ~ line 7 ~ info ~ user", user)
    

//     return msg.reply(`Username: ${user.username}#${user.discriminator}
//     Account Created: ${user.createdTimestamp}
//     Avatar: ${user.avatarURL()}`)
}