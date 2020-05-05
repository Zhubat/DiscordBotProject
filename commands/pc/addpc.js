const fs = require('fs');
const { jsonReader } = require("../../functions.js");
const fp = './commands/pc/items.json';

module.exports = {
    name: "addpc",
    aliases: ["addpc"],
    category: "addpc",
    description: "add Price check items",
    usage: "addpc",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader') || message.member.roles.cache.some(role => role.name === 'potato')){
            //console.log(itemdata.items);
            //console.log(args.slice(-1).join(''))
            //console.log(args.slice(0, -1))
            if (!args.length){
                return message.channel.send(`**No item written**\n+addpc <item name> <price>`);
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
                    
                    //console.log('in jreader')
                    //console.log(id)
                } catch(err) {
                console.log(err)
                return
                }

                //console.log(id)
                
                if (id === -1){         
                    message.reply(`\n**adding => item: ${item}, price: ${new_price}.\nPlease confirm item name and price**\n{Reply with: Y/N}`);
                    const filter = m => m.author.id === message.author.id;
                    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                        if (collected.first().content === 'Y' || collected.first().content === 'y'){
                            
                            //console.log(itemdata.items);
                            jsonReader(fp, (err, itemdata) => {
                                if (err) {
                                    console.log('Error reading file:',err)
                                    return
                                }
                                // add item
                                itemdata.items.push({name: `${item}`, price: `${new_price}`})

                                fs.writeFile(fp, JSON.stringify(itemdata), (err) => {
                                    if (err) console.log('Error writing file:', err)
                                })
                            })
                            
                            return message.reply(`\n**${item} added with price ${new_price}.**`);
                        }
                        else if (collected.first().content === 'N' || collected.first().content === 'n'){
                            return message.reply("Cancelled.");
                        }
                        else{
                            return message.reply("Cancelled.");
                        }    
                    }).catch(err => {
                        message.reply("\nTimed out...");
                        console.log(err);
                    });
                }
                else{
                    return message.channel.send(`\n**${item}** already in database\n+editpc <item name> <price (number)>`);
                }
                //}
                
            }
        } 
    }
}