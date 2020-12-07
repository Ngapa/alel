module.exports ={
	name: 'buatnama',
	description: 'Perintah untuk membuat nama secara acak dari list mahasiswa TI-19.\n\` alel buatnama \`',
	execute(message, args, Discord, mhs){
 
		const firstName = mhs.map( el => el.namaDepan)
		const midName = mhs.map(el => el.namaTengah)

		const lastName = mhs.map(el => el.namaBelakang)

		const names = `${firstName[Math.ceil(Math.random() * firstName.length)]} ${midName[Math.ceil(Math.random() * midName.length)]} ${lastName[Math.ceil(Math.random() * lastName.length)]}`
		const result = names.trim().split(' ').map( name => name[0].toUpperCase() + name.substring(1)).join(' ')


		message.channel.send('Kamu akan terlahir kembali dengan nama:')
		const nameEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(result)

		message.channel.send(nameEmbed)
	}
}