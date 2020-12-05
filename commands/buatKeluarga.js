module.exports = {
    name: 'buatKeluarga',
    description: 'Perintah untuk membuat keluarga rekayasa secara acak',
    execute(message, args) {
        let keluarga = mhs.map(el => `${el.namaDepan} ${el.namaTengah} ${el.namaBelakang}`)
        
        let keluargaEmbed = new Discord.MessageEmbed()
            .setAuthor('Keluarga Berencana', 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/6948/happy-family-clipart-md.png', 'https://www.youtube.com/watch?v=6NSQ2PKglb4')
            .setColor('RANDOM')
            .addFields(
                { name: 'Ayah', value: keluarga[Math.floor(Math.random() * keluarga.length)], inline: false },
                { name: 'Ibu', value: keluarga[Math.floor(Math.random() * keluarga.length)], inline: false },
                { name: 'Anak Pertama', value: keluarga[Math.floor(Math.random() * keluarga.length)], inline: false },
                { name: 'Anak Kedua', value: keluarga[Math.floor(Math.random() * keluarga.length)], inline: false },
                { name: 'Umur Perkawinan', value: Math.ceil(Math.random() * 60) + ' Tahun' })
            .setThumbnail('https://media.giphy.com/media/2voGcsEiAQUc2kn4sA/giphy.gif')
            .setImage('https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/6948/happy-family-clipart-md.png')
            .setFooter('Just for fun, do not take it seriously')

        message.channel.send(keluargaEmbed)
    },
}