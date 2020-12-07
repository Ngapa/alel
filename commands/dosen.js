module.exports = {
	name: 'dosen',
	description: `Perintah untuk mencari dosen berdasarkan nama/wa/email.\n\` alel dosen <matkul>/<namaDepan/belakang/tengah>/<wa>/<email> \``,
	args: true,
	execute(message, args, Discord){
		const dosen = require('/app/data/dosen.json')

		const keyword = args.join(' ').toLowerCase();
		let dosenObj = dosen.filter( el => Object.entries(el).flat().map( el => el.toLowerCase()).includes(keyword))

		if (dosenObj == 0){ 
			let dos = dosen.map( el => `${el.namaDepan} ${el.namaTengah} ${el.namaBelakang}`)
			console.log(dos);

			dos = dos.map( el => el.trim().toLowerCase())

			dosenObj = dos.filter(el => el == keyword)
			console.log(dosenObj)

			if (dosenObj == 0){ 
				return message.reply('mohon maaf pencarian tidak ditemukan.')
			}

			dosenObj = dosen.filter(el => el.namaDepan == dosenObj[0] || el.namaTengah == dosenObj[1] || el.namaTengah == dosenObj[2] )
			console.log(dosenObj)
		}
		console.log('check point')

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