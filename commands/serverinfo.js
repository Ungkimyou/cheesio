module.exports = {
	name: 'serverinfo',
	aliases: ['si', 'serveri', 'sinfo'],
	description: 'Shows information about the server',
	args: false,
	usage: '',
	guildOnly: true,
	execute(message) {
		message.channel.send(`**__Information about this server__**\n**Name:** ${message.guild.name}\n**ID:** ${message.guild.id}\n**Membercount:** ${message.guild.memberCount}`);

		console.log(`Successfully performed serverinfo command to ${message.author.tag}.`);
	},
};