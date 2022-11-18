
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const axios = require('axios')
const path = require('node:path');
const { count } = require('console');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('readers')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {




        await interaction.reply({
            content: `readers :`,
            files: [{
                attachment: path.join(__dirname, '../' + 'readers.txt'),
                name: 'reader.abnf'
            }],
            ephemeral: true
        });
    },
};