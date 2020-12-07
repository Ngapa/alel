module.exports = {
	name: 'carikan',
	description: `Perintah untuk mencari mahasiswa berdasarkan nama/nim/wa/email.\n\` alel <nim>/<namaDepan/belakang/tengah>/<wa>/<email> \``,
	args: true,
	execute(message, args, Discord, mhs){
		const keyword = args[0].toLowerCase();
		const mhsObj = mhs.filter( el => Object.entries(el).flat().includes(keyword))

		if (mhsObj == 0) return message.reply('Mohon maaf pencarian tidak ditemukan.');
		const result = mhsObj[0]
		const words = `${result.namaDepan} ${result.namaTengah} ${result.namaBelakang}`;

		const name = words.trim().split(' ').map( word => word[0].toUpperCase() + word.substring(1)).join(' ')

		const profileEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`Kartu Profil`)
			.addField('Nama', `${name}`)
			.addField('NIM', `${result.nim}`)
			.addField('Whatsapp', `${result.whatsapp}`)
			.addField('Email', `${result.email}`)
			.setImage(`https://raw.githubusercontent.com/awalariansyah/alel/main/data/${result.img}`)
			.setFooter(`Kartu ini berlaku hingga 2023 - Alel`)

		message.channel.send(profileEmbed);

	}
}