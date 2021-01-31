module.exports = {
	name: 'userinfo',
	aliases: ['wi', 'whois', 'ui'],
	description: 'Shows information about the command author or user provided.',
	args: false,
	usage: '[@user]',
	guildOnly: false,
	execute(message) {
		message.channel.send(`**__Information about you__**\n**Username:** ${message.author.tag}\n**ID:** ${message.author.id}\n`);

		console.log(`Successfully performed userinfo command to ${message.author.tag}.`);
	},
};