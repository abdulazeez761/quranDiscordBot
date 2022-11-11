const { SlashCommandBuilder } = require('discord.js');
const { AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource, VoiceConnectionStatus, getVoiceConnection, generateDependencyReport } = require('@discordjs/voice');

const axios = require('axios')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quran')
        .setDescription('playing quran')
        .addStringOption(option =>
            option.setName('surah')
                .setDescription('The input to echo back')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption(option =>
            option.setName('reader')
                .setDescription('The input to echo back')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addStringOption((option) =>
            option.setName('rewayah')
                .setDescription('The input to echo back')
                .setRequired(false)
                // add rewayah options
                .addChoices(
                    { name: `Rewayat Hafs A'n Assem`, value: `Rewayat Hafs A'n Assem` },
                    { name: `Rewayat Warsh A'n Nafi' Men  Tariq Abi Baker Alasbahani`, value: `Rewayat Warsh A'n Nafi' Men  Tariq Abi Baker Alasbahani` },
                    { name: `Rewayat Albizi and Qunbol A'n Ibn Katheer`, value: `Rewayat Albizi and Qunbol A'n Ibn Katheer` },
                    { name: `Rewayat AlDorai A'n Al-Kisa'ai`, value: `Rewayat AlDorai A'n Al-Kisa'ai` },
                    { name: `Rewayat Aldori A'n Abi Amr`, value: `Rewayat Aldori A'n Abi Amr` },
                    { name: `Sho'bah A'n Asim`, value: `Sho'bah A'n Asim` },
                    { name: `Rewayat Albizi A'n Ibn Katheer`, value: `Rewayat Albizi A'n Ibn Katheer` },
                    { name: `Ibn Thakwan A'n Ibn Amer`, value: `Ibn Thakwan A'n Ibn Amer` },
                    { name: `Rewayat Warsh A'n Nafi' Men Tariq Alazraq`, value: `Rewayat Warsh A'n Nafi' Men Tariq Alazraq` },
                    { name: `Rewayat Warsh A'n Nafi'`, value: `Rewayat Warsh A'n Nafi'` },
                    { name: `Rewayat Khalaf A'n Hamzah`, value: `Rewayat Khalaf A'n Hamzah` },
                    { name: `Almusshaf Al Mo'lim`, value: `Almusshaf Al Mo'lim` },
                    { name: `ewayat Qalon A'n Nafi'`, value: `ewayat Qalon A'n Nafi'` },
                    { name: `Almusshaf Al Mojawwad`, value: `Almusshaf Al Mojawwad` },
                    { name: `Rewayat Assosi A'n Abi Amr`, value: `Rewayat Assosi A'n Abi Amr` },
                    { name: `Rewayat Qalon A'n Nafi' Men Tariq Abi Nasheet`, value: `Rewayat Qalon A'n Nafi' Men Tariq Abi Nasheet` },
                    { name: `Rewayat Rowis and Rawh A'n Yakoob Al Hadrami `, value: `Rewayat Rowis and Rawh A'n Yakoob Al Hadrami ` },
                )
        ),

    async execute(interaction) {
        // if statment to chek if the recived interaction is a type of inputs recived
        interaction.guild.members.cache.filter(async (member) => {
            // let userchannelID2 = ''
            // let botCHannelIDd = ''
            // if (!member.user.bot) userchannelID2 = member.voice.channel?.id
            // if (member.user.bot) botCHannelIDd = member.voice.channel?.id

            // if (botCHannelIDd !== userchannelID2) return
            if (member.user.bot) return;
            if (!member.voice.channel?.id) return


            const channelID = member.voice.channel?.id
            const guildID = member.voice.channel?.guildId
            const voiceAdapterCreator = member.guild.voiceAdapterCreator
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });



            const connection = joinVoiceChannel({
                channelId: channelID,
                guildId: guildID,
                adapterCreator: voiceAdapterCreator,
            })
            // console.log(connection)
            const subscription = connection.subscribe(player);




            // connection status (controller)
            connection.on(VoiceConnectionStatus.Ready, () => {
                console.log('The connection has entered the Ready state - ready to play audio!');
            });

            connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
                try {
                    await Promise.race([
                        entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                        entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                    ]);
                    // Seems to be reconnecting to a new channel - ignore disconnect
                } catch (error) {
                    // Seems to be a real disconnect which SHOULDN'T be recovered from
                    connection.destroy();
                }
            });


            //player controller
            player.on('error', error => {
                console.error(error);
            });
            player.on(AudioPlayerStatus.Playing, () => {
                console.log('The audio player has started playing!');

                console.log(subscription?.player?._state.status)
            });

            player.on(AudioPlayerStatus.Idle, () => {
                // player.play(getNextResource());
                console.log('I stoped playing the audio')

                console.log(subscription?.player?._state.status)
            });




            // handeling the inputs
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
                    // console.log(swar?.name?.toLowerCase().replace(' ', '') == swrahInput)
                    if (swar?.name?.toLowerCase().replace(' ', '') == swrahInput) {
                        return swar
                    }

                })
            }).then(async (res) => {

                res.map(async (recivedSurah) => {
                    if (recivedSurah) {
                        await axios.get('https://www.mp3quran.net/api/v3/reciters?language=eng').then((readerd) => {
                            return readerd.data.reciters.map((reader) => {


                                if (reader.name.toLowerCase() == readderInput) {
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
                                    console.log(`${reader.moshaf[0].server}${surahURl}.mp3`)
                                    // console.log(' recived ID ' + ':' + ' ' + recivedSurah.id)

                                    const resource = createAudioResource(`${reader.moshaf[0].server}${surahURl}.mp3`);
                                    // if (play.player['_events']['idle']) return;
                                    player.play(resource)



                                }
                            })

                        })
                    }
                })
            })





        })




        await interaction.reply('replying a resbon message to the user');
    },
};