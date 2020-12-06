const Discord = require('discord.js');
const { botName, botDescription, botPrefix, botAuthor, botLogo } = require('/app/config.json')
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));

module.exports = {
    name: 'help',
    description: 'Perintah untuk menampilkan menu bantuan Alel | ` alel help `',
    execute(message, args) {
 
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`Menu Bantuan Alel`)
            .setAuthor(botName, botLogo)
            .setDescription(botDescription)
            .setColor('RANDOM')
            .addField('Prefix', `\` ${botPrefix} <perintah> \``)
            .setThumbnail('https://media.tenor.com/images/cb99fb8003fc51e3f9e71ba3555d64e6/tenor.gif')
            .setFooter(`Dibuat oleh ${botAuthor} | 2020`)

        let index = 1;
        
        for (const com of commandFiles) {
            const alelCommand = require(`./${com}`)
            helpEmbed.addField(`${index}. ${alelCommand.name}`, alelCommand.description)
        	
        	index++
        }

        message.channel.send(helpEmbed)
    }
}