const Discord = require('discord.js');
const client = new Discord.Client();
const mhs = require('./data/mhs.json');
const path = require('path');

const { botPrefix, botName, botLogo, botDescription, botAuthor } = require('./config.json');
const cron = require('cron');

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once("ready", () => {
    console.log("Alel siap melaksanakan tugas!")
    client.user.setActivity("bantuan | alel help", {
        type: "PLAYING",
        url: "https://www.fb.me/kurasu.yami"
    });
});


client.on("message", message => {
    if (!message.content.startsWith(botPrefix) || message.author.bot) return;

    const args = message.content.slice(botPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)

    try {
        command.execute(message, args, Discord, mhs)
    } catch (error) {
        console.error(error);
        message.reply('Maaf, perintah tidak dikenali!');
    }
});


client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')

    const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`Halo, ${member.user.username}`)
        .setDescription(`Selamat datang di server kami. Silakan buka pin message diatas untuk melihat informasi mengenai server ini.\n**Selamat bergabung, ${member}**.`)
        .setColor('RANDOM')
        .setFooter('© Alel')

    welcomeChannel.send(welcomeEmbed)
})


client.on("guildMemberRemove", member => {
    const byeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')

    const byeEmbed = new Discord.MessageEmbed()
        .setTitle(`Terima kasih, ${member.user.username}`)
        .setDescription(`Kami memohon maaf atas kekurangan dan kesalahan yang terdapat di server kami.\n**Selamat jalan.**`)
        .setColor('RANDOM')
        .setFooter('©️ Alel')

    byeChannel.send(byeEmbed)
})

const arisan = new cron.CronJob('0 7 * * *', () => {
        const arisanChannel = client.channels.cache.get("759964896066273316");
        const mahasiswa = mhs.map(el => `${el.namaDepan} ${el.namaTengah} ${el.namaBelakang}`)

        const pemenang = mahasiswa[Math.floor(Math.random() * mahasiswa.length)];
        const arisanEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Selamat!', `Selamat kepada **${pemenang}** telah memenangkan undian arisan hari ini!\nSilakan mention <@!607753400137940992> untuk mendapatkan 50 Exp. Hadiah akan hangus dalam 12 jam jika tidak diambil segera!`)
            .setFooter('Nantikan undian arisan berikutnya!')

        arisanChannel.send(arisanEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const sistemOperasi = new cron.CronJob('35 9 * * 1', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
       const soEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Ping', 'Sistem Operasi, 5 menit lagi @everyone')

        absensiChannel.send(soEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const bahasaInggris = new cron.CronJob('25 7 * * 2', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const bingEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Pong', 'Bahasa Inggris, 5 menit lagi @everyone')

        absensiChannel.send(bingEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const pemWeb = new cron.CronJob('35 9 * * 2', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const pwebEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Ba', 'Pemrograman Web, 5 menit lagi @everyone')

        absensiChannel.send(pwebEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const dasarRPL = new cron.CronJob('25 7 * * 3', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const rplEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Dum', 'Dasar RPL,, 5 menit lagi @everyone')

        absensiChannel.send(rplEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const islamicStudies = new cron.CronJob('35 9 * * 3', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const isEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Ba', 'Islamic Studies 2, 5 menit lagi @everyone')

        absensiChannel.send(isEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const aljabar = new cron.CronJob('25 7 * * 4', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const aljEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Boom', 'Aljabar Linier dan Matriks, 5 menit lagi @everyone')

        absensiChannel.send(aljEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const basisData = new cron.CronJob('35 9 * * 4', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const bdataEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Ba', 'Basis Data Lanjutan, 5 menit lagi @everyone')

        absensiChannel.send(bdataEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

const bisnis = new cron.CronJob('35 9 * * 5', () => {
    const absensiChannel = client.channels.cache.get("760086156842106901");
        const bisnisEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Ba', 'Manajemen Bisnis, 5 menit lagi @everyone')

        absensiChannel.send(bisnisEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

client.login(process.env.TOKEN);
