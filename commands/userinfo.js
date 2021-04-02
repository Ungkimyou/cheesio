module.exports = {
	name: 'userinfo',
	aliases: ['ui', 'wi', 'whois'],
	description: 'Shows information about the command author or user provided.',
	args: false,
	usage: '[@user]',
	guildOnly: false,
	category: 'General',
	execute(message) {

		if (!message.mentions.members.size) {
			const reply = `**__Information about ${message.author.tag}__**
**Name:** ${message.author} (${message.author.tag})
**ID:** ${message.author.id}
**Username:** ${message.author.username}
**Discriminator:** ${message.author.discriminator}
**Account Creation Date:** ${message.author.createdAt}
**Join Date:** ${message.guild.member(message.author).joinedAt}
**Nickname:** ${message.guild.member(message.author).nickname || 'None'}
**Permissions:** ${message.guild.member(message.author).permissions.toArray().map(p => p.toLowerCase().replace('_', ' ').replace('_', ' ')).join(', ') || 'None'}
**Server Boost Usage Date:** ${message.guild.member(message.author).premiumSince || 'The user has not used a Server Boost'}
**Display Color:** ${message.guild.member(message.author).displayHexColor}
**Roles:** ${message.guild.member(message.author).roles.cache.map(r => r.name).join(', ').replace(', @everyone', '')}
**Highest Role:** ${message.guild.member(message.author).roles.highest.name}
**Status:** ${message.guild.member(message.author).presence.status.replace(/^\w/, (c) => c.toUpperCase())}
**Platform:** ${Object.keys(message.author.presence.clientStatus).join(', ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) || 'Unable to fetch data about platform'}
**Game:** ${message.guild.member(message.author).presence.activities.name || 'None'}
**Details:** ${message.guild.member(message.author).presence.activities.details || 'None'}
**Custom Status Emoji:** ${message.guild.member(message.author).presence.activities.emoji || 'None'}
**User Features:** ${message.guild.member(message.author).user.flags.toArray().map(p => p.toLowerCase().replace('_', ' ').replace('_', ' ')).join(', ') || 'None'}`;
			return message.channel.send(reply);
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
	},
};