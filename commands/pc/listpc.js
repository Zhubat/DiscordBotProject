const fs = require('fs');
const { jsonReader } = require("../../functions.js");
const fp = './commands/pc/items.json';

module.exports = {
    name: "listpc",
    aliases: ["listpc"],
    category: "listpc",
    description: "list Price check items",
    usage: "listpc",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader') || message.member.roles.cache.some(role => role.name === 'potato')){
            try {
                const jsonString = fs.readFileSync(fp)
                const itemdata = JSON.parse(jsonString)
                itemlist = JSON.stringify(itemdata.items);
            } catch(err) {
            console.log(err)
            return
            }
            
            return message.channel.send(itemlist);
        }
    }
}