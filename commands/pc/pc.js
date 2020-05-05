const fs = require('fs');
const { jsonReader } = require("../../functions.js");
const fp = './commands/pc/items.json';

module.exports = {
    name: "pc",
    aliases: ["pc"],
    category: "pc",
    description: "Price check items",
    usage: "pc",
    run: async (client, message, args) => {
        //console.log(itemdata.items);
        if (!args.length){
            return message.channel.send(`**No item written**\n+pc <item name>`);
        }
        else{
            user_input = args.join(' ');
            item = args.join('');
            item = item.toLowerCase();
            
            var id = -1;
            try {
                const jsonString = fs.readFileSync(fp)
                const itemdata = JSON.parse(jsonString)
                for (var i = 0; i < itemdata.items.length; i++){
                    if (item === itemdata.items[i].name){
                        id = i;
                    }
                }
                if (id > 0) pc = itemdata.items[id].price
                //console.log('in jreader')
                //console.log(id)
            } catch(err) {
            console.log(err)
            return
            }

            if (id > 0){
                //console.log(`**${itemdata.items[id].price}**`);
                return message.reply(`**${pc}**`);
            }
            else{
                return message.channel.send(`**${user_input} not in database**\n+pc <item name>`);
            }
        }
    }
}