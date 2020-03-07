const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../functions.js');
const config = require('../../config.json');

module.exports = {
    run: async(client, message, args) => {
        const logs = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        //If no arguments provided
        if (!args[0]) return message.reply(" You must mention the member you wish to ban.").then(m => m.delete(5000));
        //Not specified a reason
        if (!args[1]) return message.reply(" You must specify a reason for this ban").then(m => m.delete(5000));
        //User does not have permission
        if (!message.member.hasPermission("BAN_MEMBERS")) return;
        //Bot doesn't have permission
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(" I do not have permission, please contact an admin.").then(m => m.delete(5000));

        const userBan = message.mentions.member.first() || message.guild.members.get(args[0]);

        //Couldn't find member
        if (!userBan) return message.reply(" Couldn't find this member, please try again.").then(m => m.delete(5000));
        //Self ban attempt
        if (userBan.id === message.author.id) return message.reply(" Why on earth would you want to ban yourself?").then(m => m.delete(5000));
        //Is the user bannable?
        if (!userBan.bannable) return message.reply(" I cannot ban this member.").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(userBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Banned User:** ${userBan} (${userBan.id})
            **> Banned by:** ${message.member} (${message.member.id})
            **> Ban Reason:** ${args.slice(1).join(" ")}`);

        userBan.ban(args.slice(1).join(" ")).catch(err => {
            if (err) return message.channel.send(`**Error**: ${err}`);
        });

        logs.send(embed);
    }
}