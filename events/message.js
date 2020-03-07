const config = require('../config.json');

exports.run = async (client, message) => {
    const config = require('../config.json');
    if (message.author.bot) return;
    if (!message.member.roles.has(config.roles.team)) return message.reply("You must be a Divergent member to use my commands, sorry.");
    if (message.content.startsWith(config.prefix)) {
        if (message.channel.id == config.command_channel_id || message.channel.id == config.staff_command_channel_id) {
            let msgArr = message.content.split(" ");
            let cmd = msgArr[0];
            let args = msgArr.slice(1);
            let cmdFile = client.commands.get(cmd.slice(config.prefix.length));
            if (!cmdFile) return;
            cmdFile.run(client, message, args);
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) {
                message.reply("You cannot request commands in this text channel.").then(msg => {
                    msg.delete(10000);
                });
            } else {
                let msgArr = message.content.split(" ");
                let cmd = msgArr[0];
                let args = msgArr.slice(1);
                let cmdFile = client.commands.get(cmd.slice(config.prefix.length));
                if (!cmdFile) return;
                cmdFile.run(client, message, args);
            }
        }
    }
};