module.exports = {
	name: 'bersihkan',
	description: 'Perintah untuk membersihkan pesan.\n\` alel bersihkan <2-100> \`',
	excecute(message, args, Discord){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply('kamu tidak punya izin!');
		if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Maaf, Alel tidak punya izin.');

		if(!args[0]) return message.reply(`tolong masukkan jumlah pesan yang akan dibersihkan!`)
		const delAmount = Number(args[0], 10)

		if(isNaN(delAmount)) return message.reply(`tolong masukkan jumlah pesan yang valid`)
		if(!Number.isInteger(delAmount)) return message.reply(`jumlah pesan harus dalam bilangan bulat 2 - 100`)

		if(!delAmount || delAmount < 2 || delAmount > 100) return message.reply(`jumlah pesan harus berada diantara  2 sampai 100`)
		const mesFetch = message.channel.messages.fetch({
			limit: delAmount
		});

		try{
			message.channel.bulkDelete(mesFetch)
				.then( el => message.channel.send(`pesan telah dibersihkan sejumlah ${el.size}`));

		}catch(err){
			console.log(err)
			message.reply(`pesan gagal dibersihkan. karena pesannya berumur lebih dari 14 hari`)
		}

	}

}