const { Events, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder, Options, ConnectionVisibility } = require('discord.js');
const wait = require('timers/promises').setTimeout;
const axios = require('axios');
const { off } = require('process');

//reciving the selected option
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        //handeling autocomplete event
        if (interaction.isAutocomplete()) {

            const focusedOption = interaction.options.getFocused(true);

            if (focusedOption.name == 'surah') {
                const swar = []
                await axios.get('https://www.mp3quran.net/api/v3/suwar?language=eng').then((result) => {

                    result.data.suwar.map((swrah) => {
                        if (swrah.id <= 25)
                            swar.push(`${swrah.name.toLowerCase()}`)
                    })
                }).catch((err) => {
                    console.log(err)
                });


                const filtered = swar.filter(choice => choice.startsWith(focusedOption.value.toLowerCase()));


                await interaction.respond(

                    filtered.map(choice => {

                        return choice.length !== 0 ? ({ name: choice, value: choice }) : ({ name: 'test', value: 'dwad' })

                    })
                )



            }

            if (focusedOption.name == 'reader') {
                const reciters = []
                await axios.get('https://www.mp3quran.net/api/v3/reciters?language=eng').then((result) => {

                    result.data.reciters.map((re) => {
                        if (re.id <= 25)
                            reciters.push(`${re.name.toLowerCase()}`)
                    })

                }).catch((err) => {
                    console.log(err)
                });
                const filtered = reciters.filter(choice => choice.startsWith(focusedOption.value.toLowerCase()));
                await interaction.respond(

                    filtered.map(choice => {
                        return choice.length !== 0 ? ({ name: choice, value: choice }) : ({ name: 'no values matches plz write ..... to see the names ', value: 'dwad' })

                    })
                )



            }
        }

        // console.log(interaction.options._hoistedOptions)

        // if (!interaction.isSelectMenu()) return;

        // if (interaction.customId === 'languageSelect') {
        //     //getting the surah api accourding to what the user has selected
        //     const data = []
        //     await axios.get('https://mp3quran.net/api/v3/languages').then((res) => {
        //         data.push(res.data.language)
        //     })
        //     let surahURL = ''
        //     data[0].map((lang) => {
        //         if (lang.language == interaction.values[0]) {
        //             surahURL = lang.surah
        //             // console.log(lang.rewayah)
        //             // console.log(lang.reciters)
        //         }
        //     })

        //     // getting the name of the surahs 
        //     let surahsData = [];
        //     await axios.get(surahURL).then((res) => {
        //         surahsData.push(res.data.suwar)
        //     })

        //     //storing the options of the menu
        //     const options = []
        //     surahsData[0].map((surah) => {
        //         if (surah.id <= 25) {
        //             options.push({
        //                 label: `surah ${surah.name}`,
        //                 description: 'This is a description as well',
        //                 value: `${surah.name}`
        //             })
        //         }

        //     })
        //     // creating the menu
        //     const row = new ActionRowBuilder()
        //         .addComponents(
        //             new SelectMenuBuilder()
        //                 .setCustomId('surahSelection')
        //                 .setPlaceholder('select your language')
        //                 .addOptions(
        //                     options
        //                 ),
        //         );
        //     const embed = new EmbedBuilder()
        //         .setColor(0x0099FF)
        //         .setTitle(`now select a surah to play`)
        //         .setDescription(`your language is ${interaction.values[0]}`);
        //     await interaction.deferUpdate();
        //     await wait(4000);


        //     await interaction.editReply({ content: `you've selected  ${interaction.values[0]}`, ephemeral: true, embeds: [embed], components: [row] })
        // }

        // // getting the surah to play it
        // if (interaction.customId == 'surahSelection') {
        //     console.log(interaction.values[0])
        // }

    }
}