module.exports = {
    name: "calc",
    aliases: ["calc"],
    category: "calc",
    description: "damage calc link",
    usage: "calc",
    run: async (client, message, args, tools) => {
        message.channel.send("This is a link to Pokemon Showdown's Damage Calculator:\nhttps://calc.pokemonshowdown.com/?gen=7");
    }
}