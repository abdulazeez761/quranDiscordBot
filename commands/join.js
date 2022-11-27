const { SlashCommandBuilder, Collection, PermissionsBitField, permissionsIn } = require('discord.js');
const { joinVoiceChannel, VoiceConnectionStatus, getVoiceConnection, entersState } = require('@discordjs/voice');
const delay = new Collection()
const ms = require('ms')
module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('you must call it to make the bot join the channel then you can use the rest of the commands '),
    async execute({ client, interaction }) {
        // const commanad = client.commands.get(interaction.commandName)
        // if (commanad.cooldown) {
        //     if (delay.has(`${commanad.data.name}-${interaction.user.id}`)) return interaction.reply(`You can use this command again after **${ms(delay.get(`${commanad.data.name}-${interaction.user.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${commanad.data.name}-${interaction.user.id}`) - Date.now(), { long: true })}**`);
        // }



        if (interaction.member.user.bot) return
        // console.log(member)
        const channelID = interaction.member.voice.channel?.id
        const guildID = interaction.member.voice.channel?.guildId
        const voiceAdapterCreator = interaction.member.guild.voiceAdapterCreator
        if (!channelID) return await interaction.reply('your not in a channel');
        const connection = getVoiceConnection(interaction.member.voice.channel.guildId); // I'm cheking if there is a connection
        if (connection) return await interaction.reply('the bot is already connected');
        if (!interaction.guild.members.me.permissionsIn(interaction.member.voice.channel).has(PermissionsBitField.Flags.Connect) || !interaction.guild.members.me.permissionsIn(interaction.member.voice.channel).has(PermissionsBitField.Flags.ViewChannel)) {
            return interaction.reply("I don't have a permissions to join or view this channel  plz give a permissions first ( I need to be abel to view and connect to the channel in order to join)");
        }
        if (!connection) {
            const connection = joinVoiceChannel({
                channelId: channelID,
                guildId: guildID,
                adapterCreator: voiceAdapterCreator,
            })

            // connection status (controller)
            connection.on(VoiceConnectionStatus.Ready, async () => {
                // console.log('The connection has entered the Ready state - ready to play audio!');
                return await interaction.reply({ content: 'connected', ephemeral: true });
            });

            connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {

                try {
                    await Promise.race([
                        entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                        entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                    ]);
                    // Seems to be reconnecting to a new channel - ignore disconnect
                } catch (error) {
                    // Seems to be a real disconnect which SHOULDN'T be recovered from

                    connection.destroy();
                }
            });

        }

    },
};

