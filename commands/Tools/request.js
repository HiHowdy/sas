const config = require('../../config.json');
const fs = require('fs');

module.exports = {

    run: async (client, message, args) => {
        if (!(args[0])) return message.reply("Invalid arguments.");

        if (message.deletable) {
            message.delete();
        }

        const request = args[0];
        let description = "";

        if (!(args[1])) {
            return message.reply("You must specify a description of the request to continue.");
        } else {
            for (i = 1; i < args.length; i++) {
                description += ` ${args[i]}`;
            }
        }

        let messageSend = `Your request has been recieved!\n\n**Request Type:** ${request}\n**Description:** ${description}\nA team member should be in contact with you shortly.`;

        switch (request) {
            case 'edit':
                client.channels.get("685844982502129670").send(`**Request**: <@${message.author.id}>\n**Description**: ${description}\nIf you accept this request, message the requester to let them know then delete this message.`);
                message.author.send(messageSend);
                return;
                break;
            case 'design':
                client.channels.get("685845221137055889").send(`**Request**: <@${message.author.id}>\n**Description**: ${description}\nIf you accept this request, message the requester to let them know then delete this message.`);
                message.author.send(messageSend);
                return;
                break;
            case 'upload':
                client.channels.get("685845336413306967").send(`**Request**: <@${message.author.id}>\n**Description**: ${description}\nOnce this request has been reviewed, message the player to let them know then delete this message.`);
                message.author.send(messageSend);
                return;
                break;
        }

    }
}