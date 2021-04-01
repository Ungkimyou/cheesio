module.exports = {
	name: 'changelog',
	aliases: ['updates', 'cl', 'changes'],
	description: 'Shows the changelog for me!',
	args: false,
	usage: '',
	guildOnly: false,
	ownerOnly: false,
	category: 'General',
	execute(message) {
		message.channel.send('Details of the Cheesio Development and our roadmap is here at our Trello\nhttps://trello.com/b/HEnFl5Yo/cheesio-feature-roadmap');
	},
};