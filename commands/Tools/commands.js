const config = require('../../config.json');

module.exports = {
    run: async (client, message, args) => {

        if (!args[0]) {
            if (message.member.roles.has(config.roles.admin) || message.member.roles.has(config.roles.admin)) {
                message.author.send("**Administrator/Management Commands**\n```!announce [announcement] (Sends an announcement to #announcements)\n!ban [@mention] [reason] (Bans a member from the discord server.)\n!clear [number] (clears messages in channel)```");
            }
            if (message.member.hasPermission("KICK_MEMBERS")) {
                message.author.send("**Moderator Commands**\n```!kick [@mention] [reason] (Kicks a member from the discord server.).\n```");
            }
            message.author.send("**Regular Commands**\n```!level (Checks your current level in the server).\n!meme (Grabs a random meme from reddit)\n!request [edit/design/upload] [description] (Sends a request to team members if you need edits, designs or want an upload.).```");
        }
    }
}