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
            try {
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

            } catch (err) {
                console.log(err)
                return
            }

        }
    }
}