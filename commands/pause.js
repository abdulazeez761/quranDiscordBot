const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);



        if (!interaction.member.voice.channelId) {
            return await interaction.reply('not in a channel.');
        }
        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return interaction.reply('The bot is not in this channel write "/join to call the bot" ');
        }
        if (connection?.state?.subscription?.player?._state.status == 'paused') {
            return await interaction.reply('bot is already paused ');
        }
        if (!connection?.state?.subscription?.player) {
            return await interaction.reply('bot is not playing anything ');
        }
        let player = connection?.state?.subscription?.player
        // sending an api data to the discord api with a paused audio player
        let state = player._state
        player._state = {
            ...state,
            status: 'paused'
        }

        return await interaction.reply('paused');
    },
};