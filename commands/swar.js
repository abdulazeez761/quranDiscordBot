
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { Pagination } = require("discordjs-button-embed-pagination");
const axios = require('axios')
const path = require('node:path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suwar')
        .setDescription('to see all of the swar')

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
                content: `swar :`,
                files: [{
                    attachment: path.join(__dirname, '../' + 'swar.txt'),
                    name: 'suwar.abnf'
                }],
                ephemeral: true
            });
        }
        if (interaction.options._hoistedOptions[0].value == 'text') {
            let data = []
            await axios.get('https://www.mp3quran.net/api/v3/suwar?language=eng').then((result) => {

                result.data.suwar.map((swrah) => {
                    data.push(swrah)

                })
            }).catch((err) => {
                console.log(err)
            });
            let embeds = []

            let twintyFive = ''
            let fiftySurah = ''
            let seventyFiveSurah = ''
            let handredSurah = ''
            let RestOfTheSuwar = ''

            data.map((swar) => {
                if (swar.id <= 25) {
                    twintyFive += `${swar.id} **${swar.name}**\n`
                } else if (swar.id <= 50) {
                    fiftySurah += `${swar.id} **${swar.name}**\n`
                } else if (swar.id <= 75) {
                    seventyFiveSurah += `${swar.id} **${swar.name}**\n`
                } else if (swar.id <= 100 && swar.name !== 'Quran,Audio,Library,MP3,Quran,Muftah,Alsaltany') {
                    handredSurah += `${swar.id} **${swar.name}**\n`
                }
                else if (swar.id <= 114 && swar.name !== 'Quran,Audio,Library,MP3,Quran,Muftah,Alsaltany') {
                    RestOfTheSuwar += `${swar.id} **${swar.name}**\n`
                }

            })
            embeds.push(new EmbedBuilder()
                .setTitle('suwar')
                .setColor("00ff00")
                .setDescription(twintyFive),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('suwar')
                .setColor("00ff00")
                .setDescription(fiftySurah),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('suwar')
                .setColor("00ff00")
                .setDescription(handredSurah),
            )
            embeds.push(new EmbedBuilder()
                .setTitle('suwar')
                .setColor("00ff00")
                .setDescription(RestOfTheSuwar),
            )



            await new Pagination(interaction.channel, embeds, "page",).paginate();

        }


    },
};