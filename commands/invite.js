const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Displays the Support Server invite and the bot\'s invite.',
	aliases: ['inv', 'support', 'botinvite'],
	cooldown: 10,
	usage: '',
	args: false,
	guildOnly: false,
	ownerOnly: false,
	execute(message) {
		const embed = new Discord.MessageEmbed()
			.setColor('#FFA500')
			.setTitle('Invite me to your server!')
			.setAuthor('My support server\'s invite, and my invite!', 'https://media.discordapp.net/attachments/802136652650512384/807308637507813426/Cheesio_Pfp.png')
			.setDescription('Well you asked for the advertisement...')
			.setThumbnail('https://media.discordapp.net/attachments/802136652650512384/807310573220921344/PetCheesio.gif')
			.addFields(
				{ name: 'Support Server', value: 'https://discord.gg/DYRXdYSa2d', inline: false },
				{ name: 'Bot Invite', value: 'https://discord.com/api/oauth2/authorize?client_id=796799582042193971&permissions=2147483647&scope=bot', inline: false },
			)
			.setTimestamp()
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }));

		message.channel.send(embed);
	},
};