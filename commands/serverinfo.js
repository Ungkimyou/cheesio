module.exports = {
	name: 'serverinfo',
	aliases: ['si', 'serveri', 'sinfo'],
	description: 'Shows information about the server',
	args: false,
	usage: '',
	guildOnly: true,
	category: 'General',
	execute(message) {
		const data = [];

		data.push('**__Information about this server__**');
		data.push(`**Name:** ${message.guild.name}`);
		data.push(`**ID:** ${message.guild.id}`);
		data.push(`**Region:** ${message.guild.region}`);
		data.push(`**Verification Level:** ${message.guild.verificationLevel}`);
		data.push(`**Membercount:** ${message.guild.memberCount}`);
		data.push(`**Owner:** ${message.guild.owner.user.tag}`);
		data.push(`**Server Creation Date:** ${message.guild.createdAt}`);
		data.push(`**Number of boosts:** ${message.guild.premiumSubscriptionCount}`);
		data.push(`**Boost Level:** ${message.guild.premiumTier}`);
		data.push(`**Server Logo:** ${message.guild.iconURL({ format: 'png', dynamic: true, size: 128 })}`);
		return message.channel.send(data, { split: true });
	},
};