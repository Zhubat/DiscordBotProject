const db = require('quick.db');

module.exports = {
    name: "gift",
    aliases: ["gift"],
    category: "wallet",
    description: "give other ppl money bags!",
    usage: "gift",
    run: async (client, message, args, tools) => {
        //if no one mentioned to give
        if (!message.mentions.members.first()) return message.channel.send(`**Please mention target!**\nUsage: +gift <cp amount> <tag user here>`);

        //replaces targetMember in message with a number
        let targetMember = message.mentions.members.first(),
            amount = parseInt(args.join(' ').replace(targetMember, ''));

        if (isNaN(amount)) return message.channel.send(`**Please enter a valid amount!**\nUsage: +gift <cp amount> <tag user here>`);

        let targetWallet = await db.fetch(`userBalance_${targetMember.id}`),
            selfWallet = await db.fetch(`userBalance_${message.author.id}`);

        if (targetWallet === null) targetWallet = 0;
        if (selfWallet === null) selfWallet = 0;

        if (amount > selfWallet){
            return message.channel.send(`**You don't have enough CPs.**\nUsage: +gift <cp amount> <tag user here>`);
        } 
        else{
            db.add(`userBalance_${targetMember.id}`, amount);
            db.subtract(`userBalance_${message.author.id}`, amount);
        }

        message.channel.send(`**Successfully gifted ${amount}cp to <@${targetMember.id}>!**` + " uwu");

    }
}