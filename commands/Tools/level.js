const Discord = require('discord.js');
const config = require('../../config.json');
let xp = require('../../data/xp.json');

module.exports = {
    name: "level",
    category: "Tools",
    description: "Check your level in the discord.",

    run: async (client, message, args) => {
        let currentXp = xp[message.author.id].xp;
        let currentLevel = xp[message.author.id].level;
        let nextLevel = xp[message.author.id].level * 300;

        if (!xp[message.author.id]) {
            message.channel.reply("Sorry! I couldn't find any data on you.");
        }

        let embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username}'s Level Statistics`)
            .setColor("RANDOM")
            .addField("Current Level ", currentLevel)
            .addField("Next Level", currentLevel + 1)
            .addField("Current XP", `${currentXp} / ${nextLevel}`)
        message.channel.send(embed);
    }
}