
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const axios = require('axios')
const path = require('node:path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('swar')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        await interaction.reply({
            content: `swar :`,
            files: [{
                attachment: path.join(__dirname, '../' + 'swar.html'),
                name: 'swar.abnf'
            }],
            ephemeral: true
        });
    },
};