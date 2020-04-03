module.exports = {
    name: "pc",
    aliases: ["pc"],
    category: "pc",
    description: "Price check items",
    usage: "pc",
    run: async (client, message, args) => {
        var pc_dict = {"choiceband":"110-140k", "choicespecs":"110-140k", "choicescarf":"130-150k",
                        "lifeorb": "100-120k", "assualtvest": "130-150k", "rerollticket":"\nIV: 600-700k\nNature: 350k",
                        "rarecandy": "6-8k", "focussash": "3k", "toxicorb": "50k", "flameorb": "50k", "cc": "380-410k", 
                        "blackmedalion": "180k", "bms": "180k", "membership": "\n15day: 200k\n30day:380k", "ms": "\n15day: 200k\n30day:380k",
                        "razorclaw": "20k", "shinystone": "15-20k", "razorfang": "20k", "smokeball": "15-20k", "machobrace": "30k", 
                        "protector": "20-30k", "deepseatooth": "20k", "deepseascale": "20k"}
        if (!args.length){
            return message.channel.send(`**No item written**\n+pc <item name>`);
        }
        else{
            item = args.join('');
            item = item.toLowerCase();
            
            if (item in pc_dict){
                return message.reply(`**${pc_dict[item]}**`)
            }
            else{
                return message.channel.send(`**wrong format**\n+pc <item name>`);
            }
        }
    }
}