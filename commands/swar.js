
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const axios = require('axios')
const path = require('node:path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suwar')
        .setDescription('to see all of the swar'),
    async execute({ client, interaction }) {

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