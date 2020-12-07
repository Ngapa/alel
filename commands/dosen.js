module.exports = {
	name: 'dosen',
	description: `Perintah untuk mencari dosen berdasarkan nama/wa/email.\n\` alel dosen <matkul>/<namaDepan/belakang/tengah>/<wa>/<email> \``,
	args: true,
	execute(message, args, Discord){
		const dosen = require('/app/data/dosen.json')

		const keyword = args[0].toLowerCase();
		const dosenObj = dosen.filter( el => Object.entries(el).flat().map( el => el.toLowerCase()).includes(keyword))

		if (dosenObj == 0) return message.reply('Mohon maaf pencarian tidak ditemukan.');
		dosenObj.forEach( result => {
		const words = `${result.namaDepan} ${result.namaTengah} ${result.namaBelakang}`;

		const name = words.trim().split(' ').map( word => word[0].toUpperCase() + word.substring(1)).join(' ')
		const nameTitle = `${name} ${result.gelar}`

		const profileEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`Kartu Profil Dosen`)
			.addField('Nama', `${nameTitle}`)
			.addField('Mengampu Mata Kuliah', `${result.matkul}`)
			.addField('Whatsapp', `${result.whatsapp}`)
			.addField('Email', `${result.email}`)
			.setImage(`https://raw.githubusercontent.com/awalariansyah/alel/main/data/${result.img}`)
			.setFooter(`Mahasiswa harus melampaui dosennya - Alel`)

		message.channel.send(profileEmbed);
	})
	}
}