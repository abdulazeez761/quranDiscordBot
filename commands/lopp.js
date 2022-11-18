const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
let info = require('../info.json')

const quranFunction = require('./quran')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Provides information about the server.'),
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

        info.resorce.loop = true

        // let player = connection?.state?.subscription?.player



        // let state = player._state
        // player._state = {
        //     ...state,
        //     loop: true
        // }

        // if (info.resorce.loop == false) return
        // let audio = createAudioResource(info.resorce.name);

        // player.on(AudioPlayerStatus.Idle, async () => {
        //     let state = player._state

        //     //because it's ending 
        //     setImmediate(() => {
        //         audio = createAudioResource(info.resorce.name)
        //     }, 2000)
        //     console.log(info.resorce.name)
        //     await player.play(audio)
        // });

    },
};