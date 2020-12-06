const Discord = require('discord.js');

module.exports = {
    execute(member){
        const byeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')

        const byeEmbed = new Discord.MessageEmbed()
            .setTitle(`Terima kasih, ${member.user.username}`)
            .setDescription(`Kami memohon maaf atas kekurangan dan kesalahan yang terdapat di server kami.\n**Selamat jalan.**`)
            .setColor('RANDOM')
            .setFooter('©️ Alel')

        byeChannel.send(byeEmbed)
    }
}