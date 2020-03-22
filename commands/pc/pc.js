module.exports = {
    name: "pc",
    aliases: ["pc"],
    category: "pc",
    description: "Price check items",
    usage: "pc",
    run: async (client, message, args) => {
        if (!args.length){
            return message.channel.send(`**No item written**\n+pc <item name>`);
        }
        else{
            item = args.join('');
            item = item.toLowerCase();
            if (item === "choiceband" || item === "choicespecs"){
                return message.reply("110k-140k");
            }
            else if(item === "choicescarf"){
                return message.reply("130k-150k");
            }
            else if(item === "lifeorb"){
                return message.reply("100k-120k");
            }
            else if(item === "assaultvest" || item === "rockyhelmet"){
                return message.reply("130k-150k");
            }
            else if(item === "rerollticket"){
                return message.reply("\nIV: 600k-700k\nNature: 350k");
            }
            else if(item === "rarecandy"){
                return message.reply("6-8k");
            }
            else if(item === "focussash"){
                return message.reply("3k");
            }
            else if(item === "toxicorb" || item === "flameorb"){
                return message.reply("50k");
            }
            else if(item === "cc"){
                return message.reply("380k-410k");
            }
            else if(item === "blackmedalion" || item === "bms"){
                return message.reply("180k");
            }
            else if(item === "membership" || item === "ms"){
                return message.reply("\n15day: 200k\n30day:380k");
            }
            else{
                return message.channel.send(`**wrong format**\n+pc <item name>`);
            }
        }
    }
}