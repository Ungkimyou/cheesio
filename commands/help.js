const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Lists all the commands I offer, and provides information about them.',
	aliases: ['commands', 'what', 'h'],
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('__**List of Commands**__');
			data.push(commands.map(command => `\`${command.name}\` - ${command.description}`).join('\n'));
			data.push(`\n\nIf you need information about a specific command, run \`${prefix}help <command>.\``);

			return message.channel.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('You need to provide a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};