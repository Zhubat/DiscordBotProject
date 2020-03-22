const db = require('quick.db');

module.exports = {
    name: "flip",
    aliases: ["flip"],
    category: "flip",
    description: "flipping a table",
    usage: "flip",
    run: async (client, message, args, tools) => {
        message.channel.send("(ﾉಠдಠ)ﾉ︵┻━┻");
        //db.subtract(`userBalance_${message.author.id}`, 1);
        return message.reply('┬─┬ノ(ಠ_ಠノ)\n');
    }
}