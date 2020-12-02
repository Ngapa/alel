const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const cron = require('cron');

//Run Test
client.once("ready", () => {
    console.log("Alel siap melaksanakan tugas!")
    client.user.setActivity("with Awal Ariansyah", {
        type: "STREAMING",
        url: "https://www.fb.me/kurasu.yami"
    });
});

//global var
let color = [0, 1752220, 3066993, 3447003, 10181046, 15844367, 15105570, 15158332, 9807270, 8359053, 3426654, 1146986, 2067276, 2123412, 7419530, 12745742, 11027200, 10038562, 9936031, 12370112, 2899536, 16580705, 12320855]
let list = [
    'Resti Rahmawati',
    'Putri Damayani',
    'Edgar Miko F.',
    'Ristianingsih',
    'Amarulloh M.K.',
    'Nurfadhli A.H',
    'Elang Yakti W.',
    'Khusna Salsabila',
    'Henky Fajar S.',
    'Noval Aldo R.',
    'Rafiq Chasnan H.',
    'Ina Kurnia Sari',
    'Willy Setiawan',
    'Awal Ariansyah',
    'Diky Setiawan',
    'Sri Purnama Sari',
    'Imam Fahrudin',
    'Khoirul Zuhri',
    'Maknum Munib'
]

let rng = arr => {
    for (var i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}


//Command Parser
client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const commandBody = message.content.slice(config.prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    // console.log(message.content, commandBody, args, command)

    //Command
    let pinging = function() {
        let ic = Math.floor(Math.random() * color.length);
        message.channel.send("Mencoba ping...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            let embed = new Discord.MessageEmbed()
                .setDescription(`Ba Dum Tss! Pingnya **${ping} ms.**`)
                .setColor(color[ic])
            m.edit(embed)
        });
    }

    let halo = function() {
        const pengirim = message.author;
        return message.channel.send(`>>> Halo <@${pengirim.id}>!
**Alel** siap melaksanakan tugas! :wave:`);
    }

    let buatGrup = function() {
        let anggota = parseInt(args[0])
        if (anggota > 1 && anggota <= list.length) {
            let result = new Array(Math.ceil(list.length / anggota))
                .fill()
                .map(_ => rng(list).splice(0, anggota));
            message.channel.send(`**Laksanakan!**`)
                .then(m => {
                    let ic = Math.floor(Math.random() * color.length)
                    let titleEmbed = new Discord.MessageEmbed()
                        .setColor(color[ic])
                        .setTitle(args.join(' ').substring(2))
                    m.edit(titleEmbed)
                })
            for (let i = 0; i < result.length; i++) {
                let ic = Math.floor(Math.random() * color.length)
                const grupEmbed = new Discord.MessageEmbed()
                    .setTitle(`Kelompok ${i+1}`)
                    .setDescription('-----------------')
                    .setColor(color[ic])

                for (let j = 0; j < result[i].length; j++) {
                    grupEmbed.addField(`${j+1}. ||${result[i][j]}||`, '-----------------', false)
                }
                message.channel.send(grupEmbed)
            }
        } else {
            invalid();
        }
        return
    }

    let pilihMana = function(){
        let ic = Math.floor(Math.random() * color.length)
        let choice = args.join(' ').split(',')
        let myChoice = Math.floor(Math.random()* choice.length)
        return message.channel.send('Aku mending milih...').then(m => {
            let em = new Discord.MessageEmbed()
                .setTitle(`**${choice[myChoice]}**`)
                .setColor(color[ic])
            m.edit(em)
        })
    }

    let help = function(){
        let ic = Math.floor(Math.random() * color.length)
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`Menu bantuan Alel`)
            .setAuthor('Alel')
            .setDescription(`Alel adalah bot yang dibuat khusus untuk anak TI-19 STMIK Komputama Majenang.

Fitur-fitur yang ada antara lain:
1. Melakukan ping
2. Membuat random grup
3. Memilih item acak

Prefix yang dipakai adalah \`alel <perintah> \`
Akses menu bantuan dengan \`alel help \``)
            .setColor(color[ic])
            .addField('1. ping', 'Penggunaan `alel ping`')
            .addField('2. buatgrup', 'Penggunaan `alel buatgrup <jumlahAnggota> <grupUntukApa>` \nContoh `alel buatgrup 4 Kelompok Islamic Studies`')
            .addField('3. pilihmana', 'Penggunaan `alel pilihmana <itemsatu>,<itemdua>,<itemdst>` \nContoh `alel pilihmana Naruto, Sasuke, Kakashi`\nNB: List yang dipakai adalah list mahasiswa TI-19, fitur custom list belum diaplikasikan.')
            .setTimestamp()
            .setThumbnail('https://media.tenor.com/images/cb99fb8003fc51e3f9e71ba3555d64e6/tenor.gif')
            .setImage('https://i.imgur.com/eU48z3k.png')
            .setFooter('©️ Awal Ariansyah')

            message.channel.send(helpEmbed)
    }

    let invalid = function() {
        return message.channel.send(`Maaf, perintah tidak dikenali.`)
    }


    //catcher
    switch (command) {
        case "ping":
            pinging();
            break;
        case "halo":
            halo();
            break;
        case "buatgrup":
            buatGrup();
            break;
        case "pilihmana":
            pilihMana();
            break;
        case "help":
            help();
            break;
        default:
            invalid();
            break;
    }

    // if (command === "timer") {
    //     if (args.length < 1) {
    //         message.channel.send("Masukkan waktunya (dalam menit) pak!")
    //     } else {
    //         let t = args.shift()
    //         let m = t.split('m', 1).join();
    //         let d = t.split('d', 1).join().substring(m.length + 1);
    //         let pesan = args.join(' ');
    //         message.channel.send(`Mengatur waktu selama ${m} menit ${d} detik.`);
    //         let timer = new cron.CronJob(`${d} */${m} * * * *`, () => {
    //             console.log(d, m)
    //             message.channel.send(`Ding Dong! Waktunya ${pesan}`);
    //             timer.stop()
    //             console.log("stopped!")
    //         });
    //         timer.start();

    //     }

    // }
});

// Scheduled Message
// let manajemenBisnis = new cron.CronJob('0 47 21 * * 0', () => {

//         const channel = client.channels.cache.get(config.channelId);
//         channel.send('Tes jadwal dengan tanggal dan timezone jakarta');
//     },
//     null,
//     true,
//     'Asia/Jakarta'
// );

client.login(config.token);
