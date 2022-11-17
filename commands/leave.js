const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const player = require('./quran')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        if (!interaction.member.voice.channelId) {
            return interaction.reply('not in a channel.');
        }
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);
        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return interaction.reply('The bot is not in this channel.');
        }
        // connection.state.subscription.player.stop();
        connection.destroy()
        await interaction.reply('left');
    },
};