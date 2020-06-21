const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["help"],
    category: "info",
    description: "List of commands",
    usage: "help",
    run: async (client, message, args) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#FFC0CB')
            .setTitle('Here are a list of my commands')
            .setDescription('+shop (A place to spend your CP!)\n' +
                            '+wallet (Check your CP amount)\n' +
                            '+gift <amount> <@user> (Gift some CP!)\n' +
                            //'+games (play some games!)\n' +
                            '+pc <item name> (Price check for items!)\n' +
                            '+calc (Link to damage calculator for PvP)\n' +
                            '+smogon <pokemon name> (Smogon link)\n' +
                            '+flip (Flip a table idk...)\n' +
                            '+boss20 (best bosses to do based on new boss changes.')
            .setThumbnail('https://i.imgur.com/qk7rVZz.jpg')
            .setTimestamp()
        const msg = await message.channel.send(helpEmbed);
    }
}