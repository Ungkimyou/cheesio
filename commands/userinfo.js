module.exports = {
	name: 'userinfo',
	aliases: ['ui', 'wi', 'whois'],
	description: 'Shows information about the command author or user provided.',
	args: false,
	usage: '[@user]',
	guildOnly: false,
	category: 'General',
	execute(message, args) {
		const data = [];

		if (!args) {
			data.push('**__Information about you__**');
			message.channel.send(`**__Information about you__**\n**Username:** ${message.author.tag}\n**ID:** ${message.author.id}\n`);

			return console.log(`Successfully performed userinfo command to ${message.author.tag}.`);
		}
		else if (message.mentions.members.size) {
			const listOfPingedUsers = message.mentions.members.map((user) => {
				return `**__Information about ${user.user.tag}__**
**Name:** ${user.user} (${user.user.tag})
**ID:** ${user.user.id}
**Username:** ${user.user.username}
**Discriminator:** ${user.user.discriminator}
**Account Creation Date:** ${user.user.createdAt}
**Join Date:** ${user.joinedAt}
**Nickname:** ${user.nickname || 'None'}
**Permissions:** ${user.permissions.toArray().map(p => p.toLowerCase().replace('_', ' ').replace('_', ' ')).join(', ') || 'None'}
**Server Boost Usage Date:** ${user.premiumSince || 'The user has not used a Server Boost'}
**Display Color:** ${user.displayHexColor}
**Roles:** ${user.roles.cache.map(r => r.name).join(', ').replace(', @everyone', '')}
**Highest Role:** ${user.roles.highest.name}
**Status:** ${user.presence.status.replace(/^\w/, (c) => c.toUpperCase())}
**Platform:** ${Object.keys(user.user.presence.clientStatus).join(', ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || 'Unable to fetch data about platform'}
**Game:** ${user.presence.activities.name || 'None'}
**Details:** ${user.presence.activities.details || 'None'}
**Custom Status Emoji:** ${user.presence.activities.emoji || 'None'}
**User Features:** ${user.user.flags.toArray().map(p => p.toLowerCase().replace('_', ' ').replace('_', ' ')).join(', ') || 'None'}`;
			});
			return message.channel.send(listOfPingedUsers, { split: true });
		}
		else if (!message.mentions.members.size) {
			message.channel.send('That user does not exist or is not in the server!');
		}
	},
};