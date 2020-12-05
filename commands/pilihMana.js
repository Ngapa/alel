const Discord = require('discord.js');

module.exports = {
	name: 'pilihmana',
	description: 'Perintah untuk meminta Alel memilih dari beberapa pilihan | ` alel pilihmana <opsi1>,<opsi2>,... `',
	execute(message, args){
		let choice = args.join('').split(/,+/)
        let myChoice = choice[Math.floor(Math.random()* choice.length)]
        
        return message.channel.send('Alel lebih milih...').then(m => {
            let embedPilihan = new Discord.MessageEmbed()
                .setTitle(`**${myChoice}**`)
                .setColor('RANDOM')

            m.edit(embedPilihan)
        })
	},
}