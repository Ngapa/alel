const Discord = require('discord.js');
const { botName, botDescription, botPrefix, botAuthor, botLogo } = require('/app/config.json')
const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));

module.exports = {
    name: 'help',
    description: 'Perintah untuk menampilkan menu bantuan Alel',
    execute(message, args) {
 
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`Menu Bantuan Alel`)
            .setAuthor(botName)
            .setDescription(botDescription)
            .setColor('RANDOM')
            .addField('Prefix', `${botPrefix} <perintah>`)
            .addField('\u200B','\u200B')
            .setThumbnail('https://media.tenor.com/images/cb99fb8003fc51e3f9e71ba3555d64e6/tenor.gif')
            .setImage(botLogo)
            .setFooter(botAuthor)

        const index = 1;
        
        for (const com of commandFiles) {
            const alelCommand = require(`./${com}`)
            helpEmbed.addField(`${index}. ${alelCommand.name}`, alelCommand.description)
        	
        	index++
        }

        message.channel.send(helpEmbed)
    }
}