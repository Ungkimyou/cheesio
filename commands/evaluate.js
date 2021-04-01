const Discord = require('discord.js');

module.exports = {
	name: 'evaluate',
	description: 'Executes JavaScript code. If you\'re not my owner, then don\'t dare to use this command.',
	aliases: ['eval', 'e'],
	guildOnly: false,
	ownerOnly: true,
	usage: '<Code to execute>',
	cooldown: 10,
	args: true,
	permissions: false,
	category: 'Owner Only, and strictly.',
	execute(message, args, client) {
		const clean = text => {
			if (typeof text === 'string') {
				return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
			}
			else {
				return text;
			}
		};

		try {
			const code = args.join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string') {
				evaled = require('util').inspect(evaled);
			}
			const embed = new Discord.MessageEmbed()
				.setTitle('Results after executing JavaScript code')
				.setDescription('Hopefully you didn\'t fuck up and destroy your hard drive')
				.setThumbnail('https://miro.medium.com/max/720/1*LjR0UrFB2a__5h1DWqzstA.png')
				.addField('JavaScript code to execute', code)
				.addField('Results', clean(evaled), { code: 'xl' });
			message.channel.send(embed);
		}
		catch (err) {
			message.channel.send(`**An error occurred when executing that JavaScript:** \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
};