module.exports = {
    name: 'klasemen',
    description: 'Perintah untuk melihat daftar perolehan Exp.\n` alel klasemen \n`',

    execute(message, args, Discord) {
        const exp = require('./../data/exp.json');
        if (!exp[message.author.id]){return message.reply('kamu tidak punya Exp. Ayo aktif berdiskusi!')};
        
        const server = exp[message.author.id].server;

        if (!Object.keys(server)[0]) {
            return message.reply('maaf masih belum ada klasemen. Ayo mulai aktif!');
        } else {
            const lead = Object.entries(exp).sort((a, b) => b[1].levelAndExp - a[1].levelAndExp)
            const leader = lead.filter(el => el[1].server == message.member.guild.id)
            
            const server = message.client.guilds.cache.find( guild => guild.id == message.member.guild.id)

            const result = leader.filter((el, id) => id < 10)
            const naming = result.map(el => el[0])

            const nicknames = naming.map((el) => {
                return server.member(el)
            });

            const points = result.map(el => el[1].xp)
            const levels = result.map(el => el[1].level)
            const nextP = result.map(el => el[1].nextLevelExp)

            let output = result.map(function(a, b) {
                switch (b) {
                    case 0:
                        return [`:first_place: **${nicknames[b]}**\n----Level \`${levels[b]}\`\n----Exp \`${points[b]}/${nextP[b]}\`\n`];
                        break;
                    case 1:
                        return [`:second_place: **${nicknames[b]}**\n----Level \`${levels[b]}\`\n----Exp \`${points[b]}/${nextP[b]}\`\n`];
                        break;
                    case 2:
                        return [`:third_place: **${nicknames[b]}**\n----Level \`${levels[b]}\`\n----Exp \`${points[b]}/${nextP[b]}\`\n`];
                        break;
                    default:
                        return [`**#${b+1} ${nicknames[b]}**\n----Level \`${levels[b]}\`\n----Exp \`${points[b]}/${nextP[b]}\`\n`];
                        break;
                }
            })
            const leadOut = output.flat().join("\n");


            const embedExp = new Discord.MessageEmbed()
                .setColor('#5CE1E6')
                .setTitle(`Klasemen 10 Besar`)
                .setThumbnail(message.guild.iconURL())
                .addField(`Perolehan Exp di ${message.guild.name}`, `${leadOut}`)
            message.channel.send(embedExp);
        }

     }

}