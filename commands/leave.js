const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const player = require('./quran')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('this command makse the bot leave the channel then you can use him in another channels'),
    async execute({ client, interaction }) {
        if (!interaction.member.voice.channelId) {
            return interaction.reply({ content: 'not in a channel.', ephemeral: true });
        }
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);
        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return interaction.reply({ content: 'The bot is not in this channel.', ephemeral: true });
        }
        // connection.state.subscription.player.stop();
        connection.destroy()
        await interaction.reply({ content: 'left', ephemeral: true });
    },
};