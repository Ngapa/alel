module.exports = {
    name: 'buatkeluarga',
    description: 'Perintah untuk membuat keluarga rekayasa secara acak.\n` alel buatkeluarga `',
    execute(message, args, Discord, mhs) {
        let keluarga = mhs.map(el => `${el.namaDepan} ${el.namaTengah} ${el.namaBelakang}`)
        
        let keluargaEmbed = new Discord.MessageEmbed()
            .setAuthor('Keluarga Berencana', 'https://i.imgur.com/eU48z3k.png', 'https://www.youtube.com/watch?v=6NSQ2PKglb4')
            .setColor('RANDOM')
            .addFields(
                { name: 'Ayah', value: `:man: ${keluarga[Math.floor(Math.random() * keluarga.length)]}`, inline: false },
                { name: 'Ibu', value: `:woman_red_haired: ${keluarga[Math.floor(Math.random() * keluarga.length)]}`, inline: false },
                { name: 'Anak Pertama', value: `:boy: ${keluarga[Math.floor(Math.random() * keluarga.length)]}`, inline: false },
                { name: 'Anak Kedua', value: `:girl: ${keluarga[Math.floor(Math.random() * keluarga.length)]}`, inline: false },
                { name: 'Umur Perkawinan', value:`:family_mwgb: ${Math.ceil(Math.random() * 60)}`})
            .setThumbnail('https://i.imgur.com/eU48z3k.png')
            .setFooter('Hanya untuk bercanda, jangan ditanggapi serius')

        message.channel.send(keluargaEmbed)
    },
}