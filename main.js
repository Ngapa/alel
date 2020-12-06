const Discord = require('discord.js');
const client = new Discord.Client();
const mhs = require('./data/mhs.json');

const { botPrefix, botName, botLogo, botDescription, botAuthor } = require('./config.json');
const cron = require('cron');

const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));

for( const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// client.once("ready", () => {
//     console.log("Alel siap melaksanakan tugas!")
//     client.user.setActivity("bantuan | alel help", {
//         type: "PLAYING",
//         url: "https://www.fb.me/kurasu.yami"
//     });
// });

fs.readdir('./events/', (error, files) => {
    if (error) return console.error(error);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

        const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
        const once = eventFunction.once; // A simple variable which returns if the event should run once

        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});

client.on("message", async message => {
    if (!message.content.startsWith(botPrefix) || message.author.bot) return;
    
    const args = message.content.slice(botPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName)

    try{
        command.execute(message, args)
    }catch(error){
        console.error(error);
        message.reply('Maaf, perintah tidak dikenali!');
    }
});


// client.on("guildMemberAdd", member => {
//     const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')
    
//     const welcomeEmbed = new Discord.MessageEmbed()
//         .setTitle(`Halo, ${member.user.username}`)
//         .setDescription(`Selamat datang di server kami. Silakan buka pin message diatas untuk melihat informasi mengenai server ini.\n**Selamat bergabung, ${member}**.`)
//         .setColor('RANDOM')
//         .setFooter('© Alel')

//     welcomeChannel.send(welcomeEmbed)
// })


// client.on("guildMemberRemove", member => {
//     const byeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-rules')
    
//     const byeEmbed = new Discord.MessageEmbed()
//         .setTitle(`Terima kasih, ${member.user.username}`)
//         .setDescription(`Kami memohon maaf atas kekurangan dan kesalahan yang terdapat di server kami.\n**Selamat jalan.**`)
//         .setColor('RANDOM')
//         .setFooter('©️ Alel')

//     byeChannel.send(byeEmbed)
// })

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
