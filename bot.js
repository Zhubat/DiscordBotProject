const Discord = require('discord.js');
const client = new Discord.Client();
const {
	prefix,
	token,
} = require('./config.json');

var count = 0;

client.once('ready', () => {
    console.log('Ready!');
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
['commands'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('guildMemberAdd', member => {
    to_channel = member.guild.channels.cache.find(channel => channel.name === "general"); 
    rules = member.guild.channels.cache.find(channel => channel.name === "rules-and-guidelines");
    intro = member.guild.channels.cache.find(channel => channel.name === "introduce-yourself");
    roles = member.guild.channels.cache.find(channel => channel.name === "roles-self-assignment");
    to_channel.send(`Welcome to Calamity <@${member.id}> <:ScorbunnyLove:685659896531910680>:one:\n` +
                    `Please make sure to read ${rules} and feel free to ${intro}.\n` +
                    `You can assign yourself some roles in ${roles}.\n` +
                    "Use +help for my commands if you need me.");
    
});

client.on('message', async message =>{
    if (!message.content.startsWith(prefix)){
        let str = message.content.toLowerCase();

        if (str.includes('nerd')){
            message.channel.send("no u");
        }
        if (str.includes('night') || str.includes('good night')){
            message.react('628069621731164181');
        }
        if (str.includes('morning')){
            message.react('533273456804888577')
        }
        
    }
    else{
        if (message.author.bot) return;

        if (!message.guild) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
    
        if (cmd.length === 0) return;
    
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
    
        if (command)
            command.run(client, message, args);
    }
    
    
    
});

client.login(token);