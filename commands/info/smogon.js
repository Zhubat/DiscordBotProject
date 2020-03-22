module.exports = {
    name: "smogon",
    aliases: ["smogon"],
    category: "smogon",
    description: "smogon",
    usage: "smogon",
    run: async (client, message, args, tools) => {
        if (!args.length){
            return message.channel.send(`**No Pokemon given**\nUsage: +smogon <pokemon name>\nHere's the default site:\nhttps://www.smogon.com/dex/sm/pokemon/`);
        }
        else if (args.length === 1) {
            let pokemon = args[0].toLowerCase()

            message.channel.send(`This is a smogon search for ${args[0]}:\nhttps://www.smogon.com/dex/sm/pokemon/${pokemon}`);
        }
        else{
            message.channel.send("**Invalid format!**\nUsage: +smogon <pokemon name>")
        }
    }
}