module.exports = {
    name: 'help',
    description: 'Perintah untuk menampilkan menu bantuan Alel',
    execute(message, args) {
        const { prefix, name, logo, description, author } = require(../config.json);

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`Menu Bantuan Alel`)
            .setAuthor(name)
            .setDescription(description)
            .setColor('RANDOM')
            .addField('Prefix', `${prefix} <perintah>`)
            .addField('\u200B','\u200B')
            .setThumbnail('https://media.tenor.com/images/cb99fb8003fc51e3f9e71ba3555d64e6/tenor.gif')
            .setImage(logo)
            .setFooter(author)

        const index = 1;
        
        for (const com of commandFiles) {
            const alelCommand = require(`./commands/${com}`)
            helpEmbed.addField(`${index}. ${alelCommand.name}`, alelCommand.description)
        	
        	index++
        }

        message.channel.send(helpEmbed)
    }
}