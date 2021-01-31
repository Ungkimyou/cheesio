module.exports = {
	name: 'ping',
	aliases: ['pong', 'pingpong', 'uptime', 'latency'],
	description: 'Shows the ping for the bot',
	args: false,
	usage: '',
	guildOnly: false,
	execute(message, args, client) {
		let totalSeconds = (client.uptime / 1000);
		const days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);

		const uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		message.channel.send(':ping_pong: Organising the ping...').then(sent => {
			sent.edit(`Pong! :ping_pong:\n\n**Message Roundtrip Latency:** ${sent.createdTimestamp - message.createdTimestamp}ms\n**API Latency:** ${client.ws.ping}ms\n**Uptime:** ${uptime}`);
		});

		console.log(`Successfully performed ping command to ${message.author.tag}.`);
	},
};