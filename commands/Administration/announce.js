const config = require('../../config.json');
const fs = require('fs');

module.exports = {
    run: async (client, message, args) => {
        let announcement = "";

        if (!args[0]) {
            return message.reply(config.error.args);
        } else {
            for (i = 0; i < args.length; i++) {
                announcement += ` ${args[i]}`;
            }
        }

        let channel = client.channels.get(config.channels.announcement);
        channel.send(`${announcement}\n\n Posted: [${new Date()}]`);

    }
}