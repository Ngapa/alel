const { botName, botDescription, botPrefix, botAuthor, botLogo } = require('./../config.json')
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));

module.exports = {
    name: 'help',
    description: 'Perintah untuk menampilkan menu bantuan Alel.\n` alel help `',
    execute(message, args, Discord) {
 
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`Menu Bantuan Alel`)
            .setAuthor(botName, botLogo)
            .setDescription(botDescription)
            .setColor('#5CE1E6')
            .addField('Awalan', `\` ${botPrefix} <perintah> \``)
            .setThumbnail(botLogo)
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