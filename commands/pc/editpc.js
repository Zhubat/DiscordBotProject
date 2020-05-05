const fs = require('fs');
const { jsonReader } = require("../../functions.js");
const fp = './commands/pc/items.json';

module.exports = {
    name: "editpc",
    aliases: ["editpc"],
    category: "pc",
    description: "edit Price check items",
    usage: "editpc",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader') || message.member.roles.cache.some(role => role.name === 'potato')){
            //console.log(itemdata.items);
            //console.log(args.slice(-1).join(''))
            //console.log(args.slice(0, -1))
            if (!args.length){
                return message.channel.send(`**No item written**\n+editpc <item name> <price>`);
            }
            else{
                new_price = args.slice(-1).join('');
                //var isnum = /^\d+$/.test(new_price);
                //if (!isnum){
                //    return message.channel.send(`**Please enter a valid amount!**\n+editpc <item name> <price (number)>`);
                //}
                //else{
                    
                //console.log(new_price)
                item = args.slice(0, -1).join('');
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
                    if (id > 0) old_price = itemdata.items[id].price;
                    //console.log('in jreader')
                    //console.log(id)
                } catch(err) {
                console.log(err)
                return
                }

                if (id > 0){
                    //console.log(`**${itemdata.items[id].price}**`);
                    jsonReader(fp, (err, itemdata) => {
                        if (err) {
                            console.log('Error reading file:',err)
                            return
                        }
                        // add item
                        itemdata.items[id].price = new_price;

                        fs.writeFile(fp, JSON.stringify(itemdata), (err) => {
                            if (err) console.log('Error writing file:', err)
                        })
                    })
                    return message.reply(`\n**${item} price changed from ${old_price} to ${new_price}.**`);
                }
                else{
                    return message.channel.send(`\n**${item}** not in database\n+editpc <item name> <price>`);
                }
                //}
                
            }
        } 
    }
}