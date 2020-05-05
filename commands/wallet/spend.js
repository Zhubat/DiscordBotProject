const db = require('quick.db');

module.exports = {
    name: "spend",
    aliases: ["spend"],
    category: "wallet",
    description: "take away cp",
    usage: "spend",
    run: async (client, message, args, tools) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader')){
            if (args.length != 2){
                return message.channel.send(`**Invalid format!**\nUsage: +spend <cp amount> <tag user here>`);
            }
            else{
                //if no one mentioned to give
                if (!message.mentions.members.first()) return message.channel.send(`**Please mention target!**\nUsage: +spend <cp amount> <tag user here>`);
                
                //replaces targetMember in message with a number
                let targetMember = message.mentions.members.first();
                var isnum = /^\d+$/.test(args[0]);

                if (isnum){
                    amount = args[0]
                    let targetWallet = await db.fetch(`userBalance_${targetMember.id}`),
                        selfWallet = await db.fetch(`userBalance_${message.author.id}`);

                    if (targetWallet === null) targetWallet = 0;
                    if (selfWallet === null) selfWallet = 0;

                    if (amount > targetWallet){
                        return message.channel.send(`**Looks like they don't have that much...**`);
                    }
                    else if (amount <= 0){
                        return message.reply("Cannot have 0 or negative amounts!")
                    }
                    else{
                        db.subtract(`userBalance_${targetMember.id}`, amount);
                        message.channel.send(`**<@${targetMember.id}>\n ${amount} has been deducted from your wallet.**`);
                    }
                }
                else{
                    return message.channel.send(`**Please enter a valid amount!**\nUsage: +spend <cp amount> <tag user here>`);
                }
            }
        }      
        else{
            message.channel.send(`**Access Denied.**`)
        }
    }
}

