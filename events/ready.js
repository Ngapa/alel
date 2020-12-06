const client = new Discord.Client();

module.exports = { 
	async run(client){
	console.log("Alel siap melaksanakan tugas!")
    client.user.setActivity("bantuan | alel help", {
        type: "PLAYING",
        url: "https://www.fb.me/kurasu.yami"
    })},
}