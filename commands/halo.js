const Discord = require('discord.js');

module.exports = {
    name: 'halo',
    description: 'Perintah untuk menyapa Alel.\n` alel halo `',
    execute(message, args) {
        return message.channel.send(`>>> Halo ${message.author}!
**Alel** siap melaksanakan tugas! :wave:`);
    },
}