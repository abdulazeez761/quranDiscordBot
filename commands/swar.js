
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const axios = require('axios')
const path = require('node:path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('swar')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        // axios.get('https://mp3quran.net/api/v3/suwar?language=ar').then((res) => {
        //     res.data.suwar.map((arSwar) => {
        //         console.log(`${arSwar.name}`)
        //     })
        // })
        await interaction.reply({
            content: `swar :`,
            files: [{
                attachment: path.join(__dirname, '../' + 'swar.txt'),
                name: 'suwar.abnf'
            }],
            ephemeral: true
        });
    },
};