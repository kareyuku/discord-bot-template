const { Client, Collection } = require('discord.js');
const intents = [ 'GUILDS', 'GUILD_MESSAGES' ]
const client = new Client({intents})

const fs = require('fs');

// Cache
client.commands = new Collection();
client.slashCommands = new Collection();

// Enabling important handlers from folder ./handlers
const handlerFiles = fs.readdirSync('./handlers/').filter(file => file.endsWith('.js'));
handlerFiles.map(file => require(`./handlers/${file}`)(client) );

// Enabling events from folder ./events
const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
eventFiles.map(file => require(`./events/${file}`)(client) );

// Importing commands
const commandFolders = fs.readdirSync('./commands/');
commandFolders.map(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'));
    commandFiles.map(file => {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command?.name, command);
    })
})

const slashCommandFolders = fs.readdirSync('./slashCommands/');
slashCommandFolders.map(folder => {
    const slashFiles = fs.readdirSync(`./slashCommands/${folder}/`).filter(file => file.endsWith('.js'));
    slashFiles.map(file => {
        const command = require(`./slashCommands/${folder}/${file}`);
        client.slashCommands.set(command?.name, command);
    })
})

client.on('ready', () => {

    client.guilds.cache.map(guild => {
        guild.commands.set(client.slashCommands.map(cmd => cmd))
    })

})

client.slashCommands.map(command => {

})

const config = require('./jsons/config.json');
client.config = config;
client.login(config.token);