const db = require('quick.db');

//Make it so only officer and guild leader
module.exports = {
    name: "award",
    aliases: ["award"],
    category: "wallet",
    description: "award cp",
    usage: "award",
    run: async (client, message, args, tools) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader')){
            if (args.length != 2){
                return message.channel.send(`**Invalid format!**\nUsage: +award <cp amount> <tag user here>`);
            }
            else{
                //if no one mentioned to give
                if (!message.mentions.members.first()) return message.channel.send(`**Please mention target!**\nUsage: +award <cp amount> <tag user here>`);
                
                //replaces targetMember in message with a number
                let targetMember = message.mentions.members.first();
                var isnum = /^\d+$/.test(args[0]);

                if (isnum){
                
                    let targetWallet = await db.fetch(`userBalance_${targetMember.id}`),
                        selfWallet = await db.fetch(`userBalance_${message.author.id}`);

                    if (targetWallet === null) targetWallet = 0;
                    if (selfWallet === null) selfWallet = 0;

                    if (amount <= 0){
                        return message.reply("Cannot have 0 or negative amounts!")
                    }
                    else{
                        db.add(`userBalance_${targetMember.id}`, amount);
                        message.channel.send(`**Congratulations! <@${targetMember.id}>\n You have been awarded ${amount}cp!**`);
                    }
                }
                else{
                    return message.channel.send(`**Please enter a valid amount!**\nUsage: +award <cp amount> <tag user here>`);
                }
            }
        }      
        else{
            message.channel.send(`**Access Denied.**`)
        }
    }
}