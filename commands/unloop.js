const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unloop')
        .setDescription('to unloop over the audio'),
    async execute({ client, interaction, resource }) {

        if (!interaction.member.voice.channelId) {
            return interaction.reply('not in a channel.');
        }
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId);
        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return interaction.reply('The bot is not in this channel.');
        }
        if (!connection?.state?.subscription?.player) {
            return await interaction.reply('bot is not playing anything ');
        }
        if (connection?.state?.loop == false) return interaction.reply({ content: "the audio is alreadey not looping", ephemeral: true })

        connection.state = {
            ...connection.state,
            loop: false
        }
        await interaction.reply({ content: "✅ lopping has been canseld", ephemeral: true })
    },
};