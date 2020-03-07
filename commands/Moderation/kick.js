const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../functions.js');
const config = require('../../config.json');

module.exports = {
    name: "kick",
    category: "Moderation",
    description: "Kicks a member from the server",
    usage: "<id | mention>",
    
    run: async(client, message, args) => {
        const logs = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        //If user didn't enter any args.
        if (!args[0]) return message.reply("You must mention a user to kick").then(m => m.delete(5000));
        //If user didn't give a reason.
        if (!args[1]) return message.reply("You must provide a reason for kicking this member.").then(m => m.delete(5000));
        //No permission
        if (!message.member.hasPermission("KICK_MEMBERS")) return;
        //Bot doesn't have permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("I do not have permission to kick members. Please message a staff member to fix this error.").then(m => m.delete(5000));
        }

        const userKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        //Bot didn't find this member.
        if (!userKick) return message.reply("I couldn't find this member, please try again.").then(m => m.delete(5000));
        //Is user kickable?
        if (!userKick.kickable) return message.reply("I do not have permission to kick this user.").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setThumbnail(userKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**> Kicked user: ** ${userKick} (${userKick.id})
            **> Kicked by** ${message.member} (${message.member.id})
            **> Kick Reason:** ${args.slice(1).join(" ")}`);

        userKick.kick(args.slice(1).join(" ")).catch(err => {
            if (err) return message.channel.send(`**Error**: ${err}`);
        });
        logs.send(embed);

        // FIX THIS

        // await message.channel.send(promptEmbed).then(async msg => {
        //     const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        //     if (emoji == "✅") {
        //         msg.delete();
        //         console.log("selected to kick.");
        //         userKick.kick(args.slice(1).join(" "))
        //             .catch(err => {
        //                 if (err) return message.channel.send(`Error: ${err}`);
        //             });
        //         logs.send(embed);
        //     } else if (emoji == "❌") {
        //         msg.delete();
        //         console.log("kick aborted.");
        //         message.reply(`Kick request has been cancelled.`).then(m => m.delete(10000));
        //     }
        // });

    }
}