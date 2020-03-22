const Discord = require('discord.js');
const client = new Discord.Client();
const {
	prefix,
	token,
} = require('./config.json');

client.once('ready', () => {
    console.log('Ready!');
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
['commands'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('message', async message =>{
    if (!message.content.startsWith(prefix)){
        if (message.content.includes('nerd') || message.content.includes('Nerd')){
            message.channel.send("no u")
        }
    };
    
    if (message.author.bot) return;

    if (!message.guild) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
    
});

client.login(token);