const db = require('quick.db');

module.exports = {
    name: "reset",
    aliases: ["reset"],
    category: "wallet",
    description: "reset to 0!",
    usage: "reset",
    run: async (client, message, args, tools) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader')){
            if (!message.mentions.members.first()) return message.channel.send(`**Please mention target!**\nUsage: +reset <tag user here>`);
            let targetMember = message.mentions.members.first();

            db.set(`userBalance_${targetMember.id}`, 0);
            return message.channel.send(`**<@${targetMember.id}> You have now been officially demoted to nub level.**`);
        }
        else{
            message.channel.send(`**Access Denied.**`)
        }
    }
}