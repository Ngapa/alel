const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Perintah melakukan ping koneksi | ` alel ping `',
    execute(message, args) {
        message.channel.send('Mencoba ping...').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let pingEmbed = new Discord.MessageEmbed()
                .setDescription(`Ba Dum Tss! Pingnya **${ping} ms.**`)
                .setColor('RANDOM')
            m.edit(pingEmbed)
        })
    },
};