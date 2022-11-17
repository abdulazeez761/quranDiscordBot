
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const axios = require('axios')
const path = require('node:path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('readers')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {
        // if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply('you dont have an acces to create a file ')

        const data = await axios.get('https://www.mp3quran.net/api/v3/reciters?language=eng').then((readerd) => {
            return readerd.data.reciters.map((reader) => {
                // console.log(reader.name + ':' + ' ' + reader.moshaf[0].name)
                return `${reader.id} ${reader.name}`
                // return {
                //     "reader": reader.name
                // } 
            })
        })

        fs.writeFileSync(`readers`, JSON.stringify(data));
        await interaction.reply({
            files: [{
                attachment: path.join(__dirname, '../' + 'readers'),
                name: 'readers.json'
            }], ephemeral: true
        });
    },
};