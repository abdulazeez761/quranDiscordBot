const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Client, ActivityType } = require('discord.js');
const DiscordRpc = require('discord-rpc')


module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {

        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [
                { name: `${client.guilds.cache.size} Servers!`, type: ActivityType.Watching },
            ],
            status: "online",
        });
    },
};
