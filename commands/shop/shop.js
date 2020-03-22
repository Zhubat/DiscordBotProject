const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "shop",
    aliases: ["store"],
    category: "info",
    description: "List of commands for shop",
    usage: "shop",
    run: async (client, message, args) => {
        const shopEmbed = new Discord.MessageEmbed()
            .setColor('#FFC0CB')
            .setTitle('The shop')
            .setDescription(`**What would you like to purchase?\n**` +
                            '1. Custom Role: 100cp\n' +
                            "2. Change Custom Role's Color: 40cp\n" +
                            "3. Change Custom Role's name: 30cp\n" +
                            "4. Rent a pokemon\n" +
                            "5. Exit...\n" +
                            `**Reply with 1~5**`)
            .setThumbnail('https://i.imgur.com/npaI4YO.jpg')
            .setTimestamp()
        const msg = await message.channel.send(shopEmbed);
        const filter = m => m.author.id === message.author.id;
        //message.reply("\npick?").then(r => r.delete(10000));
        message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
            if (collected.first().content === "1"){
                message.reply(`\n**You have picked 1!\nreply with your desired role's name**`);
                message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
                    message.reply(`\n**New role will be: ${collected.first().content}?\nThis will cost 100cp\nContinue?**\n{Reply with: Y/N}`);
                    const namee = collected.first().content;
                    //check if role is already taken
                    const role = message.member.roles.cache.find(role => role.name === `${namee}`);
                    if (role){
                        return message.channel.send(`**the role aready exists!\nPurchase Cancelled.**`)
                    }
                    //check if you already have a custom role
                    message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                        if (collected.first().content === 'Y' || collected.first().content === 'y'){
                            let wallet = await db.fetch(`userBalance_${message.author.id}`);
                            if (wallet < 100){
                                const Embed = new Discord.MessageEmbed()
                                .setColor('#008000')
                                .setTitle('GIT GUD')
                                .setDescription("You don't have enough CP fam!")
                                .setThumbnail('https://i.imgur.com/QrY7etY.png')
                                .setTimestamp()
                                return message.channel.send(Embed);
                            }
                            else{
                                const Embed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('What color would you like for your role?')
                                .setDescription('Pick a color by typing the hexcolor e.g. #1234ff')
                                .setThumbnail('https://i.imgur.com/D7DvAuo.jpg')
                                .setTimestamp()
                                message.channel.send(Embed);
                                message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                                    let colour = collected.first().content;
                                    if (colour.length != 7 || !colour.includes('#')){
                                        return message.channel.send(`**Invalid hexa colour!\nPurchase cancelled.**`)
                                    }
                                    message.guild.roles.create({data: { 
                                        name: `${namee}`, 
                                        color: colour,
                                        position: 35, 
                                        permissions: [] 
                                    }, reason: 'Purchased!'}).then(function(role){
                                        message.member.roles.add(role);
                                    });
                                    db.subtract(`userBalance_${message.author.id}`, 100);
                                    
                                    return message.reply("\nDone!!");
                                }).catch(err => {
                                    message.reply("\nInvalid hexacolor.\nPurchase has being cancelled.");
                                    console.log(err);
                                });
                                
                            }  
                        }
                        else if (collected.first().content === 'N' || collected.first().content === 'n'){
                            return message.reply("\nPurchase has being cancelled.");
                        }
                        else{
                            return message.reply("\nInvalid reply\nPurchase has being cancelled.");
                        }
                    }).catch(err => {
                        message.reply("\nTimed out...");
                        console.log(err);
                    });
                }).catch(err => {
                    message.reply("\nTimed out...");
                    console.log(err);
                });
            }
            else if (collected.first().content === "2"){
                message.reply(`\n**You have picked 2!\nReply with your role's name**`);
                message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
                    
                    const namee = collected.first().content;
                    
                    //check if role is already taken
                    const role = message.member.roles.cache.find(role => role.name === `${namee}`);
                    if (role){
                        const potato = message.guild.roles.cache.find(role => role.name === `potato`);
                        let dif = role.comparePositionTo(potato);
                        if (dif > 0){
                            //check if you already have a custom role
                            message.reply(`\n**Color change for ${namee}?\nThis will cost 40cp\nContinue?**\n{Reply with: Y/N}`);
                            message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                                if (collected.first().content === 'Y' || collected.first().content === 'y'){
                                    let wallet = await db.fetch(`userBalance_${message.author.id}`);
                                    if (wallet < 40){
                                        const Embed = new Discord.MessageEmbed()
                                        .setColor('#008000')
                                        .setTitle('GIT GUD')
                                        .setDescription("You don't have enough CP fam!")
                                        .setThumbnail('https://i.imgur.com/QrY7etY.png')
                                        .setTimestamp()
                                        return message.channel.send(Embed);
                                    }
                                    else{
                                        const Embed = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('What color would you like for your role?')
                                        .setDescription('Pick a color by typing the hexcolor e.g. #1234ff')
                                        .setThumbnail('https://i.imgur.com/D7DvAuo.jpg')
                                        .setTimestamp()
                                        message.channel.send(Embed);
                                        message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                                            let colour = collected.first().content;
                                            if (colour.length != 7 || !colour.includes('#')){
                                                return message.channel.send(`**Invalid hexa color!\nPurchase cancelled.**`)
                                            }
                                            role.setColor(`${colour}`);

                                            db.subtract(`userBalance_${message.author.id}`, 40);
                                            //member.roles.add(role);
                                            return message.reply("\nDone!!");
                                        }).catch(err => {
                                            message.reply("\nInvalid hexacolor.\nPurchase has being cancelled.");
                                            console.log(err);
                                        });
                                        
                                    }  
                                }
                                else if (collected.first().content === 'N' || collected.first().content === 'n'){
                                    return message.reply("\nPurchase has being cancelled.");
                                }
                                else{
                                    return message.reply("\nInvalid reply\nPurchase has being cancelled.");
                                }
                            }).catch(err => {
                                message.reply("\nTimed out...");
                                console.log(err);
                            });
                        }else {
                            return message.channel.send(`**You cannot change this role's color!\nPurchase Cancelled.**`)
                        }
                    }
                    else {
                        return message.channel.send(`**The role does not exist!\nPurchase Cancelled.**`)
                    }
                    
                }).catch(err => {
                    message.reply("\ntimed out...");
                    console.log(err);
                });
            }else if (collected.first().content === "3"){
                message.reply(`\n**You have picked 3!\nReply with your role's name**`);
                message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(collected => {
                    
                    const namee = collected.first().content;
                    
                    //check if role is already taken
                    const role = message.member.roles.cache.find(role => role.name === `${namee}`);
                    if (role){
                        const potato = message.guild.roles.cache.find(role => role.name === `potato`);
                        let dif = role.comparePositionTo(potato);
                        if (dif > 0){
                            //check if you already have a custom role
                            message.reply(`\n**Name change for ${namee}?\nThis will cost 30cp\nContinue?**\n{Reply with: Y/N}`);
                            message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                                if (collected.first().content === 'Y' || collected.first().content === 'y'){
                                    let wallet = await db.fetch(`userBalance_${message.author.id}`);
                                    if (wallet < 30){
                                        const Embed = new Discord.MessageEmbed()
                                        .setColor('#008000')
                                        .setTitle('GIT GUD')
                                        .setDescription("You don't have enough CP fam!")
                                        .setThumbnail('https://i.imgur.com/QrY7etY.png')
                                        .setTimestamp()
                                        return message.channel.send(Embed);
                                    }
                                    else{
                                        const Embed = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('What new name do you want?')
                                        .setDescription("ಠ_ಠ")
                                        .setThumbnail('https://i.imgur.com/jJLS0Pz.jpg')
                                        .setTimestamp()
                                        message.channel.send(Embed);
                                        message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(async collected => {
                                            let new_name = collected.first().content;
                                            
                                            role.edit({ name: `${new_name}`});

                                            db.subtract(`userBalance_${message.author.id}`, 30);
                                            //member.roles.add(role);
                                            return message.reply("\nDone!!");
                                        }).catch(err => {
                                            message.reply("\nFailed in name change.\nPurchase has being cancelled.");
                                            console.log(err);
                                        });
                                        
                                    }  
                                }
                                else if (collected.first().content === 'N' || collected.first().content === 'n'){
                                    return message.reply("\nPurchase has being cancelled.");
                                }
                                else{
                                    return message.reply("\nInvalid reply\nPurchase has being cancelled.");
                                }
                            }).catch(err => {
                                message.reply("\nTimed out...");
                                console.log(err);
                            });
                        }else {
                            return message.channel.send(`**You cannot change this role's color!\nPurchase Cancelled.**`)
                        }
                    }
                    else {
                        return message.channel.send(`**The role does not exist!\nPurchase Cancelled.**`)
                    }
                    
                }).catch(err => {
                    message.reply("\nTimed out...");
                    console.log(err);
                });
            }
            else if (collected.first().content === "4"){
                return message.channel.send("Just go DM rose then ლ(ಠ益ಠლ");
            }
            else if (collected.first().content === "5"){
                return message.reply("(ﾉಠдಠ)ﾉ︵┻━┻");
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