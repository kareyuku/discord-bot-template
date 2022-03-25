const {Message, Client} = require('discord.js');

module.exports = {

    name: "help",
    aliases: ["h"],
    memberPermissions: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} m
    */
    filter: (client, m) => {
        if(!m.channel.nsfw) return { text: 'To use that command you need to use it on channel with NFSW'}
    },  

    /**
    * @param {Client} client
    * @param {Message} m
    * @param {[]} args
    */
    run: (client, m, args) => {
        m.reply("Hi, its my help command!");
        return;
    }

}