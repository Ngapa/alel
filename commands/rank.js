const canvacord = require("canvacord");

module.exports = {
    name: 'rank',
    description: 'Perintah untuk melihat perolehan Exp yang telah didapatkan.\n` alel rank `',
    execute(message, args, Discord) {
        const exp = require('./../data/exp.json')
        if (exp[message.author.id] == null) message.reply('kamu tidak punya Exp. Ayo aktif berdiskusi!');

        const listSort = Object.entries(exp).sort((a, b) => b[1].level - a[1].level)
        const ranking = listSort.filter(el => el[1].server == message.member.guild.id)

        const userList = ranking.map(el => el[0])
        const user = userList.filter(el => el == message.author.id).join('')

        const rankingUser = userList.indexOf(user) + 1

        const rank = new canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setCurrentXP(exp[message.author.id].xp)
            .setRequiredXP(exp[message.author.id].nextLevelExp)
            .setStatus(message.author.presence.status)
            .setProgressBar(['#5CE1E6', '#127275'], "GRADIENT")
            .setUsername(message.author.username, '#5CE1E6')
            .setLevel(exp[message.author.id].level, 'Level')
            .setLevelColor('#5CE1E6', '#ffffff')
            .setRankColor('#5CE1E6', '#ffffff')
            .setCustomStatusColor('#5CE1E6')
            .setRank(rankingUser, 'Peringkat', true)
            .setDiscriminator(message.author.discriminator, '#1aa4aa')
            .renderEmojis(true);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "Kartu Peringkat.png");
                message.channel.send(attachment);
            });

    }
}