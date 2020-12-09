
module.exports = {
    name: 'halo',
    description: 'Perintah untuk menyapa Alel.\n` alel halo `',
    execute(message, args) {
        message.reply(`Halo ${message.author}!
**Alel** siap melaksanakan tugas! :wave:`);
    },
}