const { SlashCommandBuilder, Constants, permissionsIn, PermissionsBitField } = require('discord.js');
const { AudioPlayerStatus, createAudioPlayer, NoSubscriberBehavior, createAudioResource, getVoiceConnection, getNextResource } = require('@discordjs/voice');
const config = require('config');
const axios = require('axios')
let info = require('../info.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quran')
        .setDescription('playing quran')
        .addStringOption(option =>
            option.setName('surah')
                .setDescription('write the name of the surah here ')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('reader')
                .setDescription('write the name of the reader here ')
                .setRequired(true)
                .setAutocomplete(true)
        )

    ,




    async execute({ client, interaction }) {

        if (!interaction.member.voice.channelId) {
            return await interaction.reply('not in a channel.');
        }
        if (!interaction.guild.members.me.permissionsIn(interaction.member.voice.channel).has(PermissionsBitField.Flags.Speak)) {
            return await interaction.reply("I don't have permissions to speak this channel channels plz give a permission first (if you gave me the grean light to speak in the channel and it is still shows that I'm muted write /leave then /join again)");
        }
        let connection = getVoiceConnection(interaction.member.voice.channel.guildId);
        // console.log(connection?.state?.subscription?.player?._state?.status)
        if (connection?.state?.subscription?.player?._state?.status == 'playing') return interaction.reply('there is already an audio playing rite  ');
        if (connection?.state?.subscription?.player?._state?.status == 'paused') return interaction.reply('the player is paused you should stop the player first then play onther audio');
        if (!connection || (connection.joinConfig.channelId != interaction.member.voice.channelId)) {
            return interaction.reply('The bot is not in this channel write "/join to call the bot" ');
        }

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });



        const subscribe = connection.subscribe(player);

        let swrahInput = ''
        let readderInput = ''
        let rewayahInput = ''

        interaction.options._hoistedOptions.map((inputs) => {
            inputs.name == 'surah' ? swrahInput = inputs.value.toLowerCase().replace(' ', '') : ''
            inputs.name == 'reader' ? readderInput = inputs.value.toLowerCase() : ''
            inputs.name == 'rewayah' ? rewayahInput = inputs?.value?.toLowerCase() : ''
        })


        await axios.get('https://mp3quran.net/api/v3/suwar?language=eng').then((res) => {
            return res.data.suwar.map((swar) => {

                if (swar?.name?.toLowerCase().replace(' ', '') == swrahInput) {
                    return swar
                }
                // return interaction.editReply({ content: `swar field does not match any of the swar write /swar to get all of the swar `, ephemeral: true });
                // return console.log('the name of the surah doesnt match')
            })
        }).then(async (res) => {
            res.map(async (recivedSurah) => {
                if (recivedSurah) {
                    await axios.get('https://www.mp3quran.net/api/v3/reciters?language=eng').then((readerd) => {
                        return readerd.data.reciters.map((reader) => {
                            if (reader?.name?.toLowerCase() == readderInput) {
                                return reader
                            }

                        })
                    }).then((recivedReader) => {
                        recivedReader.map((reader) => {
                            if (reader) {
                                let surahURl = ''
                                if (`${recivedSurah.id}`.length == 1) surahURl = '00' + `${recivedSurah.id}`
                                if (`${recivedSurah.id}`.length == 2) surahURl = '0' + `${recivedSurah.id}`
                                if (`${recivedSurah.id}`.length == 3) surahURl = `${recivedSurah.id}`

                                const resource = createAudioResource(`${reader.moshaf[0].server}${surahURl}.mp3`, { inlineVolume: true });
                                connection.state = {
                                    ...connection.state,
                                    resource: `${reader.moshaf[0].server}${surahURl}.mp3`,
                                    loop: false
                                }
                                player.play(resource)
                            }
                        })

                    })
                }
            })

            player.on('error', error => {
                console.error(error);
            });
            player.on(AudioPlayerStatus.Playing, async () => {

                console.log('The audio player has started playing!');
                // return await interaction.reply({ content: `playing ${swrahInput}...`, ephemeral: true });
            });

            player.on(AudioPlayerStatus.Idle, async () => {

                if (connection?.state?.loop !== true) return //if the loop is not on
                await player.play(createAudioResource(connection?.state?.resource))


            });
        })

    },
};