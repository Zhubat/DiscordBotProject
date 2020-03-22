const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "gamesnotdoneyet",
    aliases: ["gamesnotdoneyet"],
    category: "gamesnotdoneyet",
    description: "try your luck",
    usage: "gamesnotdoneyet",
    run: async (client, message, args) => {
        const gamesEmbed = new Discord.MessageEmbed()
            .setColor('#FFC0CB')
            .setTitle('TEST YOUR LUCK <:Harold:587723016281260033>')
            .setDescription(`**What would you like play?\n**` +
                            '1. PLAY THE LOTTERY!\n' +
                            "2. Heads or tails I guess\n" +
                            `**Reply with 1~2**`)
            .setThumbnail('https://i.imgur.com/f3a9GlV.png')
            .setTimestamp()
        const msg = await message.channel.send(gamesEmbed);
        const filter = m => m.author.id === message.author.id;
        //message.reply("\npick?").then(r => r.delete(10000));
        message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
            if (collected.first().content === "1"){
                message.reply(`\n**You have picked 1!\nTime to spin!**`);
            }
            else if (collected.first().content === "2"){
                message.reply(`\n**You have picked 2!\nHeads or Tails?**`);
            }
            else{
                return message.reply("\nBad");
            }
        }).catch(err => {
            message.reply("\nTimed out...");
            console.log(err);
        });
    }
}