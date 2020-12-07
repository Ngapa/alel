module.exports = {
    name: 'ping',
    description: 'Perintah melakukan ping koneksi.\n` alel ping `',
    execute(message, args, Discord) {
        message.channel.send('Mencoba ping...').then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let pingEmbed = new Discord.MessageEmbed()
                .setDescription(`Ba Dum Tss! Pingnya **${ping} ms.**`)
                .setColor('RANDOM')
            m.edit(pingEmbed)
        })
    },
};