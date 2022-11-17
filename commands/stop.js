const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const player = require('./quran')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        // player.execute({ client, interaction })
        if (!interaction.member.voice.channelId) {
            return interaction.reply('not in a channel.');
        }
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);
        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return interaction.reply('The bot is not in this channel.');
        }

        let player = connection?.state?.subscription?.player
        // sending an api data to the discord api with a idle audio player wich meanes the player has no audio to play
        let state = player._state
        player._state = {
            ...state,
            status: 'Idle'
        }

        return await interaction.reply('stoped');

    },
};