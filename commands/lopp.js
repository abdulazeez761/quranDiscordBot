const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
let info = require('../info.json')

const quranFunction = require('./quran')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('to loop over the aoduio'),
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
        if (info.resorce.loop == true) return interaction.reply({ content: "the audio is alreadey  looping", ephemeral: true })

        info.resorce.loop = true
        await interaction.reply({ content: "✅ lopping has been started", ephemeral: true })
    },
};