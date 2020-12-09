module.exports = {
	name: 'carikan',
	description: `Perintah untuk mencari mahasiswa berdasarkan nama/nim/wa/email.\n\` alel carikan <nim>/<namaDepan/belakang/tengah>/<wa>/<email> \``,
	args: true,
	execute(message, args, Discord, mhs){
		const keyword = args[0].toLowerCase();
		const mhsObj = mhs.filter( el => Object.entries(el).flat().map( el => el.toLowerCase()).includes(keyword))

		if (mhsObj == 0) return message.reply('mohon maaf pencarian tidak ditemukan.');
		mhsObj.forEach( result => {
		const words = `${result.namaDepan} ${result.namaTengah} ${result.namaBelakang}`;

		const name = words.trim().split(' ').map( word => word[0].toUpperCase() + word.substring(1)).join(' ')

		const profileEmbed = new Discord.MessageEmbed()
			.setColor('#5CE1E6')
			.setTitle(`Kartu Profil`)
			.setThumbnail('https://raw.githubusercontent.com/awalariansyah/alel/main/data/img/lainnya/stmikkomputama.png')
			.addField('Nama', `${name}`)
			.addField('NIM', `${result.nim}`)
			.addField('Whatsapp', `${result.whatsapp}`)
			.addField('Email', `${result.email}`)
			.setImage(`https://raw.githubusercontent.com/awalariansyah/alel/main/data/${result.img}`)
			.setFooter(`Kartu ini berlaku hingga 2023 - Alel`)

		message.channel.send(profileEmbed);
	})
	}
}