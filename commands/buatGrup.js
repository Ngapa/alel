const Discord = require('discord.js');
const mahasiswa = require('/app/data/mhs.json');

const rng = arr => {
    for (var i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}

module.exports = {
    name: 'buatgrup',
    description: 'Perintah untuk membagi kelompok sebanyak-n anggota.\n` alel buatgrup <jumlahAnggota> <grupApa> `',
    args: true,
    execute(message, args) {
        let anggota = parseInt(args[0])

        if (anggota < 1 || anggota >= mahasiswa.length) {
            return message.reply(`Maaf, perintah tidak dikenali!`)
        }

        let kelompok = mahasiswa.map(el => el.namaDepan);
        let result = new Array(Math.ceil(kelompok.length / anggota))
            .fill()
            .map(_ => rng(kelompok).splice(0, anggota));

        message.channel.send(`**Laksanakan!**`)
            .then(el => {
                let grupTitleEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(args.splice(1, args.length).join(' '))
                el.edit(grupTitleEmbed)
            })

        for (let i = 0; i < result.length; i++) {
            const grupEmbed = new Discord.MessageEmbed()
                .setTitle(`Kelompok ${i+1}`)
                .setDescription('#########')
                .setColor('RANDOM')

            for (let j = 0; j < result[i].length; j++) {
                grupEmbed.addField(`${j+1}. ${result[i][j]}`, '———', false)
            }

            message.channel.send(grupEmbed)
        }
    },
}