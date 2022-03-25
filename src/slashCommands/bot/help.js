const { Client, CommandInteraction } = require('discord.js');

module.exports = {

    name: "help",
    description: "View help information",

    memberPermissions: ['ADMINISTRATOR'],

    /**
     * @param {Client} client
     * @param {CommandInteraction} i
     */

    filter: (client, i) => {
        if(!i.channel.nsfw) return { text: 'To use that command you need to use it on channel with NFSW'}
    },

    /**
     * @param {Client} client 
     * @param {CommandInteraction} i 
     */

    run: (client, i) => {

        i.followUp({content: "Hi, its my help command"})
    
    }

}