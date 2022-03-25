const { Client } = require('discord.js');

/**
 * @param {Client} client 
 */

module.exports = (client) => {

    client.on('messageCreate', async (m) => {

        if(m.author.bot || m.author.id == client.user.id ) return;

        const args = m.content.split(' ');
        const prefix = client.config.prefix;
        const requested = args[0].slice(prefix.length)

        const command = client.commands.find(cmd => cmd.name == requested || cmd.aliases.includes(requested));
        if(!command) return;

        if(command?.botPermissions) {
            const botMember = m.guild.members.cache.get(client.user.id);
            const perms = command?.botPermissions.filter(perm => !botMember.permissions.has(perm));
            if(perms.length > 0) return m.reply({
                content: `Bot dont have access to execute this command, to use this command you require permissions: ${perms.join(', ')}`
            })
        }

        if(command?.memberPermissions) {
            const perms = command?.memberPermissions.filter(perm => !m.member.permissions.has(perm));
            if(perms.length > 0) return m.reply({
                content: `You dont have access to this command, to use this command you require permissions: ${perms.join(', ')}`
            })
        }

        if(command?.filter) {
            const filterResponse = command?.filter(client, m);
            if(filterResponse?.text) return m.reply(`${filterResponse?.text}`);
        }

        try {
            command.run(client, m, args);
        } catch(err) {
            console.log(err);
            m.reply(`Got unexpected error :/`)
        }

    })

}