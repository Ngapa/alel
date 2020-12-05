module.exports = {
	name: 'pilihMana',
	description: 'Perintah untuk meminta Alel memilih dari beberapa pilihan',
	execute(message, args){
		let choice = args.join('').split(/,+/)
        let myChoice = choice[Math.floor(Math.random()* choice.length)]
        
        return message.channel.send('Alel lebih milih...').then(m => {
            let embedPilihan = new Discord.MessageEmbed()
                .setTitle(`**${choice[myChoice]}**`)
                .setColor('RANDOM')

            m.edit(embedPilihan)
        })
	},
}