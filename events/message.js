const config = require('../config.json');

exports.run = async (client, message) => {
    const config = require('../config.json');
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
            let msgArr = message.content.split(" ");
            let cmd = msgArr[0];
            let args = msgArr.slice(1);
            let cmdFile = client.commands.get(cmd.slice(config.prefix.length));
            if (!cmdFile) return;
            cmdFile.run(client, message, args);
    }
};