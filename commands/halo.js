
module.exports = {
    name: 'halo',
    description: 'Perintah untuk menyapa Alel.\n` alel halo `',
    execute(message, args) {
        message.reply(`halo juga. Salam kenal :wave:`);
    },
}