const fs = require('fs');
const { jsonReader } = require("../../functions.js");
const fp = './commands/pc/items.json';

module.exports = {
    name: "delpc",
    aliases: ["delpc"],
    category: "delpc",
    description: "delete Price check items",
    usage: "delpc",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader') || message.member.roles.cache.some(role => role.name === 'potato')){
            if (!args.length){
                return message.channel.send(`**No item written**\n+delpc <item name>`);
            }
            else{
                item = args.join('');
                item = item.toLowerCase();
                //console.log(item)
                
                var id = -1;
                try {
                    const jsonString = fs.readFileSync(fp)
                    const itemdata = JSON.parse(jsonString)
                    for (var i = 0; i < itemdata.items.length; i++){
                        if (item === itemdata.items[i].name){
                            id = i;
                        }
                    }
                    
                    //console.log('in jreader')
                    //console.log(id)
                } catch(err) {
                console.log(err)
                return
                }

                //console.log(id)

                if (id > 0){
                    
                    jsonReader(fp, (err, itemdata) => {
                        if (err) {
                            console.log('Error reading file:',err)
                            return
                        }
                        // add item
                        itemdata.items.splice(id, 1)

                        fs.writeFile(fp, JSON.stringify(itemdata), (err) => {
                            if (err) console.log('Error writing file:', err)
                        })
                    })
                    return message.reply(`\n**${item} has been removed.**`);
                }
                else{
                    return message.channel.send(`\n**${item}** not in database\n+delpc <item name>`);
                }
                //}
                
            }
        }
    }
}