const db = require('quick.db');

module.exports = {
    name: "wallet",
    aliases: ["wallet", "balance"],
    category: "wallet",
    description: "money bags!",
    usage: "wallet",
    run: async (client, message, args, tools) => {
        //|| message.member.roles.cache.some(role => role.name === 'potato')
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader')){
            let user = message.mentions.users.first() || message.author;    //get user

            let wallet = await db.fetch(`userBalance_${user.id}`);      //get wallet of user
            if (wallet === null) wallet = 0;        //set wallet to 0 if none

            message.channel.send(`<@${user.id}> - Wallet: ${wallet}cp`);
        }
        else{
            let user = message.author;
            let wallet = await db.fetch(`userBalance_${user.id}`);      //get wallet of user
            if (wallet === null) wallet = 0;        //set wallet to 0 if none

            message.channel.send(`<@${user.id}> - Wallet: ${wallet}cp`); 
        }
        
    }
}