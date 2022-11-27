const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('q-commands')
        .setDescription('quran bot commands list'),
    async execute({ client, interaction }) {
        const imfoEmbed = new EmbedBuilder()
            .setColor("00ff00")
            .setTitle("quran bot commnds list")
            .setAuthor({ name: 'quran', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFq70ZiQHiViJNBUU8LoWYDo0JPfwIgVeAw&usqp=CAU' })
            .setDescription("اوامر بوت القرآان")
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFq70ZiQHiViJNBUU8LoWYDo0JPfwIgVeAw&usqp=CAU')
            .addFields({ name: 'join', value: "to make the bot join the channel /لادخال البوت الى الروم ", inline: false })
            .addFields({ name: 'leave', value: "to make the bot leaves the channel / لجعل البوت يغادر الروم", inline: false })
            .addFields({ name: 'loop', value: "to make the bot loops over the aduio / تكرار السورة", inline: false })
            .addFields({ name: 'unloop', value: "to make the bot unloops over the aduio / لايقاف تكرار السورة", inline: false })
            .addFields({ name: 'pause', value: "to pause the audio / لايقاف البوت مؤقتا ", inline: false })
            .addFields({ name: 'unpuase', value: "to resume the audio / استئناف البوت", inline: false })
            .addFields({ name: 'stop', value: "to stop the audio / لايقاف السورة الحالية", inline: false })
            .addFields({ name: 'suwar', value: "to see all of the  names of the suwar / لرؤية جميع السورة وكيف تكتب ", inline: false })
            .addFields({ name: 'readers', value: "to see all of the  names of the readers / لرؤية جميع القراء وكيف تكتب ", inline: false })
            .setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFq70ZiQHiViJNBUU8LoWYDo0JPfwIgVeAw&usqp=CAU')
            .setTimestamp()
            .setFooter({
                text: 'abdulazeez#7039 في حال وجود اي خلل تواصل مع ', iconURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZFq70ZiQHiViJNBUU8LoWYDo0JPfwIgVeAw&usqp=CAU'
            });


        return await interaction.reply({ content: 'commands', embeds: [imfoEmbed], ephemeral: true });
    },
};