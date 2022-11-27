const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, Client, ActivityType } = require('discord.js');
const DiscordRpc = require('discord-rpc')


module.exports = {
    name: Events.GuildCreate,
    async execute({ client, interaction }) {
        client.users.fetch('501127380337819658', false).then((user) => {
            user.send(`joined a new server now I've joined ${client.guilds.cache.size} Servers!`);
        });

    }
};
