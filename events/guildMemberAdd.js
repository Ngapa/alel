const Discord = require('discord.js')

module.exports = {
    run(member){
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')

        const welcomeEmbed = new Discord.MessageEmbed()
            .setTitle(`Halo, ${member.user.username}`)
            .setDescription(`Selamat datang di server kami. Silakan buka pin message diatas untuk melihat informasi mengenai server ini.\n**Selamat bergabung, ${member}**.`)
            .setColor('RANDOM')
            .setFooter('© Alel')
    },
}