const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const wait = require('timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);


        if (!interaction.member.voice.channelId) {
            return await interaction.reply('not in a channel.');
        }

        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return await interaction.reply('The bot is not in this channel write "/join to call the bot" ');
        }
        if (connection?.state?.subscription?.player?._state?.status == 'playing') {
            return await interaction.reply('bot is not paused ');
        }

        let player = connection?.state?.subscription?.player
        // sending an api data to the discord api with a playing audio player
        let state = player._state
        player._state = {
            ...state,
            status: 'playing'
        }

        return await interaction.reply('unpaused');

    },
};
