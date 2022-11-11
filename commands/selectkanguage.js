const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('chose a language'),
    async execute(interaction) {
        const data = []
        await axios.get('https://mp3quran.net/api/v3/languages').then((res) => {
            data.push(res.data.language)
        })

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('languageSelect')
                    .setPlaceholder('select your language')
                    .addOptions(
                        data[0].map((lang) => {
                            return {
                                label: `${lang.language} language`,
                                value: `${lang.language}`,
                            }
                        })

                    ),
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('language')
            .setDescription('select your language ');

        await interaction.reply({ content: 'select your language', ephemeral: true, embeds: [embed], components: [row] });
    },
};