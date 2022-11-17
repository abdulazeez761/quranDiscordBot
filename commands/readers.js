
const fs = require('fs');
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const axios = require('axios')
const path = require('node:path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('readers')
        .setDescription('Provides information about the server.'),
    async execute({ client, interaction }) {

        // let Count = 0;
        // let data = await axios.get('https://www.mp3quran.net/api/v3/reciters?language=eng').then((readerd) => {
        //     return readerd.data.reciters.map((reader) => {
        //         // console.log(reader.name + ':' + ' ' + reader.moshaf[0].name)
        //         // data.push(`${reader.id} ${reader.name}`)
        //         console.log(
        //             {
        //                 "number": ++Count,
        //                 "name": reader.name
        //             }
        //         )

        //     })
        // })



        await interaction.reply({
            content: `readers :`,
            files: [{
                attachment: path.join(__dirname, '../' + 'readers.html'),
                name: 'reader.abnf'
            }],
            ephemeral: true
        });
    },
};