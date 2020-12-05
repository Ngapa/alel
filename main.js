const Discord = require('discord.js');
const client = new Discord.Client();

const {prefix} = require('./config.json');
const cron = require('cron');

const dir = process.cwd();

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));

for( const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

const rng = arr => {
    for (var i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}

client.once("ready", () => {
    console.log("Alel siap melaksanakan tugas!")
    client.user.setActivity("bantuan | alel help", {
        type: "PLAYING",
        url: "https://www.fb.me/kurasu.yami"
    });
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

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    if(!client.commands.has(command)) return;

    try{
        command.execute(message, args)
    }catch(error){
        console.error(error);
        message.reply('Maaf, perintah tidak dikenali!');
    }
});

const arisan = new cron.CronJob('0 7 * * *', () => {
        const arisanChannel = client.channels.cache.get("759964896066273316");
        const mahasiswa = mhs.map(el => `${el.namaDepan} ${el.namaTengah} ${el.namaBelakang}`)
            
        const pemenang = mahasiswa[Math.floor(Math.random() * mahasiswa.length)];
        const arisanEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Selamat!',`Selamat kepada **${pemenang}** telah memenangkan undian arisan hari ini!\nSilakan mention <@!607753400137940992> untuk mendapatkan 50 Exp. Hadiah akan hangus dalam 12 jam jika tidak diambil segera!`)
            .setFooter('Nantikan undian arisan berikutnya!')
        
        arisanChannel.send(arisanEmbed);
    },
    null,
    true,
    'Asia/Jakarta'
);

client.login(process.env.TOKEN);
