const db = require('quick.db');

module.exports = {
    name: "testmoneyblooo",
    aliases: ["testmoneyblooo"],
    category: "wallet",
    description: "test!",
    usage: "testmoneyblooo",
    run: async (client, message, args, tools) => {
        db.add(`userBalance_${message.author.id}`, 1000);
        return message.channel.send("successful.")
    }
}