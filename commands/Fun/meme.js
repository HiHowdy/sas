const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: "meme",
    category: "fun",
    description: "Send a meme from a random subreddit.",

    run: async (client, message, args) => {
        const subReddits = ["dankmeme", "meme", "me_irl", "bikinibottomtwitter", "memeeconomy", "trippinthroughtime", "WhitePeopleTwitter", "bonehurtingjuice"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);

        message.channel.send(img);
    }
};