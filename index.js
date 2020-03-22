const Discord = require('discord.js');
const {
    prefix,
    token,
} = require('./config.json');

const client = new Discord.Client();
client.login(token);

client.once('ready', () => {
    console.log('Ready!');
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
})

client.on('message', function (user, userID, channelID, message, evt){
    
    if (message.substring(0, 1) == '+'){
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'help':
                client.sendMessage({
                    to: channelID,
                    message: 'commands are: \n'
                });
                help();
            break;
        }
    }
    

});

function help(){
    var fs = require("fs");
    var helptext = fs.readFileSync("./help.txt", {"encoding": "utf-8"});
    return client.send(helptext);
}
