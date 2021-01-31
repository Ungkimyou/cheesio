module.exports = {
	name: 'avatar',
	aliases: ['pfp', 'av', 'profilepic'],
	description: 'Shows the avatar URL for the user provided.',
	args: false,
	usage: '[@user]',
	guildOnly: false,
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Heres your avatar\n${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`); // If no users are pinged show the author's pfp
		}

		const listOfPfps = message.mentions.users.map(user => {
			return `Here's ${user.username}'s avatar\n${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
		});

		message.channel.send(listOfPfps);

		console.log(`Successfully performed avatar command to ${message.author.tag}.`);
	},
};