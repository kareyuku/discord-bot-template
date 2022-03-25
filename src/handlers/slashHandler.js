const { Client, CommandInteraction } = require('discord.js');

/**
 * @param {Client} client 
 */

module.exports = (client) => {

    /**
     * @param {CommandInteraction} i
     */

    client.on('interactionCreate', async(i) => {
        if(!i.isApplicationCommand()) return;

        const command = client.slashCommands.find(cmd => cmd.name == i.commandName );

        await i.deferReply({ ephemeral: false }).catch(() => {});

        if(command?.botPermissions) {
            const botMember = i.guild.members.cache.get(client.user.id);
            const perms = command?.botPermissions.filter(perm => !botMember.permissions.has(perm));
            if(perms.length > 0) return i.followUp({
                content: `Bot dont have access to execute this command, to use this command you require permissions: ${perms.join(', ')}`,
                ephemeral: true
            })
        }

        if(command?.memberPermissions) {
            const perms = command?.memberPermissions.filter(perm => !i.member.permissions.has(perm));
            if(perms.length > 0) return i.followUp({
                content: `You dont have access to this command, to use this command you require permissions: ${perms.join(', ')}`,
                ephemeral: true
            })
        }

        if(command?.filter) {
            const filterResponse = command?.filter(client, i);
            if(filterResponse?.text) return i.followUp({
                content: `${filterResponse?.text}`,
                ephemeral: true
            })
        }

        try {
            command.run(client, i)
        } catch(err) {
            console.log(err);
            i.reply({
                content: "Got unexpected error :/",
                ephemeral: true
            })
        }

    })

}