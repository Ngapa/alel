const Discord = require('discord.js');
const client = new Discord.Client();

const mhs = require('./data/mhs.json');
const path = require('path');

const exp = require('./data/exp.json');
const canvacord = require("canvacord");

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
    if (!message.guild) return;
    if (message.author.bot) return;

    let addExp = Math.floor(Math.random() * 10) + Math.floor(message.content.length/2);

    if(!exp[message.author.id]){
        exp[message.author.id] = {
            xp: 0,
            level: 0,
            nextLevelExp: 30,
            server: `${message.member.guild.id}`
        };
    }

    let nowExp = exp[message.author.id].xp;
    exp[message.author.id].xp = nowExp + addExp;

    let addedExp = exp[message.author.id].xp;
    let nowLevel = exp[message.author.id].level;

    let nowNext = exp[message.author.id].nextLevelExp;

    if(addedExp > nowNext){
        exp[message.author.id].nextLevelExp = Math.floor(nowNext * 1.5);
        exp[message.author.id].level = nowLevel + 1; 

        exp[message.author.id].xp = 0;
        const levelUpEmbed = new Discord.MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`**Selamat!**\n${message.author} berhasil naik ke level ${exp[message.author.id].level}!`)
            .setColor('#5CE1E6')
            .setFooter('Ayo aktif terus tanpa spamming!')

        message.channel.send(levelUpEmbed);
    }

    fs.writeFileSync("./data/exp.json", JSON.stringify(exp));

    if(!message.content.startsWith(botPrefix)) return;

    const args = message.content.slice(botPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)

    try {
        command.execute(message, args, Discord, mhs)
    } catch (error) {
        console.error(error);
        message.reply('maaf perintah tidak dikenali.');
    }
});


client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')

    const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`Halo, ${member.user.username}`)
        .setDescription(`Selamat datang di server kami. Silakan buka pesan pin di atas untuk melihat informasi mengenai server ini.\n**:wave: Selamat bergabung, ${member}**`)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor('RANDOM')
        .setFooter(':blue_heart: Alel')

    welcomeChannel.send(welcomeEmbed)
})


client.on("guildMemberRemove", member => {
    const byeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')

    const byeEmbed = new Discord.MessageEmbed()
        .setTitle(`Terima kasih, ${member.user.username}`)
        .setDescription(`Kami memohon maaf atas kekurangan dan kesalahan yang terdapat di server kami.\n**:wave: Selamat jalan**`)
        .setThumbnail('https://i.imgur.com/eU48z3k.png')
        .setColor('RANDOM')
        .setFooter(':blue_heart: Alel')

    byeChannel.send(byeEmbed)
})

const arisan = new cron.CronJob('0 7 * * *', () => {
        const arisanChannel = client.channels.cache.get("759964896066273316");
        const mahasiswa = mhs.map(el => `${el.namaDepan} ${el.namaTengah} ${el.namaBelakang}`)

        const imageName = mhs.map(el => el.namaDepan.toLowerCase())

        const pemenang = mahasiswa[Math.floor(Math.random() * mahasiswa.length)];
        const arisanEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setThumbnail(`https://raw.githubusercontent.com/awalariansyah/alel/main/data/${imageName}`)
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
            .addField('Dum', 'Dasar RPL, 5 menit lagi @everyone')

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
