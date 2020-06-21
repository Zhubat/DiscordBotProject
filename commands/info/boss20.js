module.exports = {
    name: "boss20",
    aliases: ["boss20"],
    category: "boss20",
    description: "bosslimit",
    usage: "boss20",
    run: async (client, message, args, tools) => {
        message.channel.send("The 20 Most Viable Bossses:\n\n" +
                            "0. Battle Bot - If you have active membership (Not for newer players)\n"+
                            "1. Ash Westbrook - Gives lot of money (Not for newer players)\n" +
                            "(All Dual Bosses give higher money than single bosses)\n" +
                            "2. Shary & Shaui - High Tier Pokemon Rewards (Need 120 Gen 1 caught dex and 38 evolved ex to access the area)\n" +
                            "3. Medussa & Eldir - Alolan Grimer and Alolan Vulpix + Mini MS\n" +
                            "4. Pewdie & Diepy - High Tier Pokemon\n" +
                            "5. Thor - Tier 9 Pokemon\n" +
                            "6. Tigerous - Gives Eumi Tokens which give good rewards\n" +
                            "7. Urahara - Tier 9 Pokemon + PvP items \n" +
                            "8. Brock - Fossil Pokemon + Nugget and Big Nugget\n" +
                            "9. Morty - Gives Rotom (The best pokemon to sell)\n" +
                            "10. Professor Oak - Gives Starters \n" +
                            "11. Professor Elm - Gives Starters \n" +
                            "12. Professor Birch - Gives Starters \n" +
                            "13. Professor Rowan - Gives Starters \n" +
                            "14. Spectify - Gives Nugget and Big Pearl + Good Pokemon \n" +
                            "15. Lt. Surge - Gives Rotom \n" +
                            "16. Terminator - Gives Rotom , Alolan Grimer + Good items \n" +
                            "17. Entei Guardian - Chance to give Choice Band (Not for newer players)\n" +
                            "18. Raikou Guardian - Chance to give Choice Scarf (Not for newer players)\n" +
                            "19. Suicune Guardian - Chance to give Choice Specs (Not for newer players)\n" +
                            "20. Erika - Gives Larvesta , Ferrothorn \n\n" +

                            "Others 5 Bosses for Newer Players (If not able to fight Shary and Shaui) : \n\n" +

                            "21. Chuck - Gives Timburr , Mienfoo \n" +
                            "21. Neroli - Gives Good Pokemon \n" +
                            "22. Naruto Fanboy - Gives Big Pearl + Sash + Rare Candy \n" +
                            "23. Link - Good Pokemon + Good Items \n" +
                            "24. Misty - Pearl + Good Pokemon \n" +
                            "25. Koichi - Good Pokemon\n")
                            .then(msg => {
                                msg.delete({ timeout: 60000 })
                            })
                            .catch(console.error);
    }
}
