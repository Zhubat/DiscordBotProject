const Discord = require("discord.js");

module.exports = {
    name: "mod",
    aliases: ["mod"],
    category: "mod",
    description: "List of commands for officers",
    usage: "mod",
    run: async (client, message, args) => {
        if (message.member.roles.cache.some(role => role.name === 'Officer') || message.member.roles.cache.some(role => role.name === 'Guild Leader') || message.member.roles.cache.some(role => role.name === 'potato')){
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#FFC0CB')
                .setTitle('Here are hidden commands for officers')
                .setDescription('+award <cp amount> <tag user here>\n' +
                                '+reset <tag user here>\n' +
                                '+spend <cp amount> <tag user here>\n' +
                                '+addpc <item name> <price>\n' +
                                '+delpc <item name>\n' +
                                '+editpc <item name> <price>\n' +
                                '+listpc\n')
                .setTimestamp();
            message.author.send(helpEmbed);
        }
    }
    
}