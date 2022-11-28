
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { Pagination } = require("discordjs-button-embed-pagination");
const axios = require('axios')
const path = require('node:path');
const { count } = require('console');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('readers')
        .setDescription('to see all of the available readers with how many swar they have recorded')

        .addStringOption(option =>
            option.setName('form')
                .setDescription('send a file of all the swar  if youre on a phne choose the other option')
                .setRequired(true)
                .addChoices(
                    { name: 'text', value: 'text' },
                    { name: 'file', value: 'file' },

                )),
    async execute({ client, interaction }) {



        if (interaction.options._hoistedOptions[0].value == 'file') {
            await interaction.reply({
                content: `readers :`,
                files: [{
                    attachment: path.join(__dirname, '../' + 'readers.txt'),
                    name: 'reader.abnf'
                }],
                ephemeral: true
            });
        }

        if (interaction.options._hoistedOptions[0].value == 'text') {
            let data = []
            await axios.get('https://www.mp3quran.net/api/v3/reciters?language=eng').then((result) => {

                result.data.reciters.map((reciters) => {
                    data.push(reciters)

                })
            }).catch((err) => {
                console.log(err)
            });
            let embeds = []

            let twintyFive = ''
            let fiftyReciters = ''
            let seventyReciters = ''
            let handredReciters = ''
            let oneTwintyFiveReciter = ''
            let onFiftyReciter = ''
            let onSavinty = ''
            let twoHandred = ''
            let theRest = ''
            data.map((reciters) => {
                if (reciters.id <= 25) {
                    twintyFive += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                } else if (reciters.id <= 50) {
                    fiftyReciters += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                } else if (reciters.id <= 75) {
                    seventyReciters += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                } else if (reciters.id <= 100) {
                    handredReciters += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                }
                else if (reciters.id <= 125) {
                    oneTwintyFiveReciter += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                }
                else if (reciters.id <= 150) {
                    onFiftyReciter += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                }
                else if (reciters.id <= 175) {
                    onSavinty += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                }
                else if (reciters.id <= 200) {
                    twoHandred += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                }
                else if (reciters.id <= 260) {
                    theRest += `${reciters.id} **${reciters.name}**  surah total : ${reciters.moshaf[0].surah_total} \n`
                }

            })
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(twintyFive),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(fiftyReciters),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(seventyReciters),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(handredReciters),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(oneTwintyFiveReciter),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(onFiftyReciter),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(onSavinty),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(twoHandred),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('Reciters')
                .setColor("00ff00")
                .setDescription(theRest),
            )



            await new Pagination(interaction.channel, embeds, "page",).paginate();

        }
    },
};