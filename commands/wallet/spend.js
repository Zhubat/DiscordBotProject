const db = require('quick.db');

module.exports = {
    name: "spend",
    aliases: ["spend"],
    category: "wallet",
    description: "take away cp",
    usage: "spend",
    run: async (client, message, args, tools) => {
        const member = message.mentions.members.first();
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader')){
            //if no one mentioned to give
            if (!message.mentions.members.first()) return message.channel.send(`**Please mention target!**\nUsage: +take <cp amount> <tag user here>`);

            //replaces targetMember in message with a number
            let targetMember = message.mentions.members.first(),
                amount = parseInt(args.join(' ').replace(targetMember, ''));

            if (isNaN(amount)) return message.channel.send(`**Please enter a valid amount!**\nUsage: +take <cp amount> <tag user here>`);

            let targetWallet = await db.fetch(`userBalance_${targetMember.id}`);

            if (targetWallet === null) return message.reply("Nothing to take...");

            if (amount > targetWallet){
                return message.channel.send(`**Looks like they don't have that much...**`);
            }
            else{
                db.subtract(`userBalance_${targetMember.id}`, amount);
            }
            
            message.channel.send(`**Successfully taken ${amount}cp from <@${targetMember.id}>!**`);

        }
        else{
            message.channel.send(`**Access Denied.**`)
        }
    }
}