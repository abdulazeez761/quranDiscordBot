const { Events } = require('discord.js');
// const { execute } = require('./clientReady');
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;

        // const locales = {
        //     pl: 'Witaj Świecie!',
        //     de: 'Hallo Welt!',
        //     ar: 'يصشيشصي'
        // };

        // message.reply(locales[message.locale] ?? 'Hello World (default is english)');
    }
}