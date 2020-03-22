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
            //if no one mentioned to give
            if (!message.mentions.members.first()) return message.channel.send(`**Please mention target!**\nUsage: +award <cp amount> <tag user here>`);

            //replaces targetMember in message with a number
            let targetMember = message.mentions.members.first(),
                amount = parseInt(args.join(' ').replace(targetMember, ''));

            if (isNaN(amount)) return message.channel.send(`**Please enter a valid amount!**\nUsage: +award <cp amount> <tag user here>`);

            let targetWallet = await db.fetch(`userBalance_${targetMember.id}`),
                selfWallet = await db.fetch(`userBalance_${message.author.id}`);

            if (targetWallet === null) targetWallet = 0;
            if (selfWallet === null) selfWallet = 0;

            
            db.add(`userBalance_${targetMember.id}`, amount);
            

            message.channel.send(`**Congratulations! <@${targetMember.id}>\n You have being awarded ${amount}cp!**`);
        }
        else{
            message.channel.send(`**Access Denied.**`)
        }
        

    }
}