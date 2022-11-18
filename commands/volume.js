const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const player = require('./quran')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
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
        if (!connection?.state?.subscription?.player) {
            return await interaction.reply('bot is not playing anything ');
        }

        let player = connection?.state?.subscription?.player
        // sending an api data to the discord api with a idle audio player wich meanes the player has no audio to play
        let resource = player?._state?.resource.volume

        // console.log(resource.volume.volume)


        // player._state.resource.volume = {
        //     ...resource,
        //     volume: 0.3
        // }
        // console.log(resource.volume)

        // return await interaction.reply({content:"voluem is ..."});

    },
};