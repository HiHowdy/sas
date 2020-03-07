const config = require("./config.json"); //Load the configuration data.
const Discord = require("discord.js"); //Load Discord.js
const fs = require('fs');
const { success, error, warning } = require("log-symbols");

let xp = require('./data/xp.json');

const client = new Discord.Client({ disableEveryone: true });

//Beginning of Command Handler.
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

const modules = ['Administration', 'Moderation', 'Fun', 'Tools'];

//Search commands directory for commands.
modules.forEach(c => {
    fs.readdir(`./commands/${c}`, (err, files) => {
        if (err) return console.log(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./commands/${c}/${file}`);
            console.log(`${success} Command Loaded: ${file}.`);
            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log(`${success} Event Loaded: ${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});

client.on("ready", async () => {
    console.log(`${client.user.username} is now online.`);
    client.user.setActivity("!commands", { type: "STREAMING" })
});

client.on('message', message => {
    let addXp = Math.floor(Math.random() * 6) + 14;

    if (message.author.bot) return;

    //Check if user doesn't have any stored XP.
    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            user: `${message.author.username}`,
            xp: 0,
            level: 1
        };
    }

    //Needed amount of XP for users next level
    let nextLevel = xp[message.author.id].level * 300;
    let currentXp = xp[message.author.id].xp;
    let currentLevel = xp[message.author.id].level;

    xp[message.author.id].xp = currentXp + addXp;

    //Level Up.
    if (nextLevel <= xp[message.author.id].xp) {
        xp[message.author.id].level = currentLevel + 1;
        let levelUp = new Discord.RichEmbed()
            .setTitle("Level Up!")
            .setColor("RANDOM")
            .addField("New Level", currentLevel + 1)
            .setImage(message.author.avatarURL);
        let level_channel = message.client.channels.get(config.level_channel_id);
        level_channel.send(levelUp);
        message.author.send(`Congrats ${message.author.username}! You just leveled up!.`);
    }

    fs.writeFile("./data/xp.json", JSON.stringify(xp), (err) => {
        if (err) console.log(err);
    });
});

//Check if someone goes live.
client.on('presenceUpdate', (oldMember, newMember) => {
    // FIX
    const msg_chnl = client.channels.get("503573367027400704");
    let oldStreamingStatus = oldMember.presence.game ? oldMember.presence.game.streaming : false;
    let newStreamingStatus = newMember.presence.game ? newMember.presence.game.streaming : false;

    if (oldStreamingStatus == newStreamingStatus) return;

    if (newStreamingStatus) {
        if (newMember.presence.game && newMember.presence.game.name == 'game name' || newMember.presence.game.details.match(/keywords in stream/gi)) {
            msg_chnl.send(`${newMember.user} has just went live! ${newMember.presence.game.url}`);
        }
    }
});

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "" + min);
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

client.login(config.token);

