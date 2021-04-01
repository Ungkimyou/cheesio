const Discord = require('discord.js');
const { ownerID } = require('../config.json');
const cooldowns = new Discord.Collection();
const prefix = 'c!';

module.exports = {
	name: 'message',
	async execute(message, currentVersion, client) {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (command.guildOnly && message.channel.type === 'dm') {
			return message.channel.send('I can\'t execute that command inside DMs!');
		}

		if (command.permissions) {
			const perms = message.channel.permissionsFor(message.author);
			if (!perms || !perms.has(command.permissions)) {
				const neededPerm = command.permissions.toLowerCase().replace('_', ' ');
				return message.channel.send(`You can't do this, you need the ${neededPerm} permission!`);
			}
		}

		if (message.author.id !== ownerID && command.ownerOnly) {
			return message.channel.send('That\'s an owner-only command, you can\'t use that!');
		}

		if (command.args && !args.length) {
			let reply = 'You need to provide some arguments!';

			if (command.usage) {
				reply += `\n\n**Correct Usage:**\n\`${prefix}${commandName} ${command.usage}\`\n\n\`<>\` represents a required argument\n\`[]\` represents an optional argument`;
			}

			return message.channel.send(reply);
		}

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				console.log(`Cooldowned ${message.author.tag} for ${timeLeft.toFixed(1)} more seconds on the ${command.name} command`);
				return message.channel.send(`**Cooldown**\nYou are on cooldown, please wait ${timeLeft.toFixed(1)} more second(s) before running the \`${command.name}\` command again.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args, client);
			console.log(`${message.author.tag} used the ${command.name} command`);
		}
		catch(error) {
			console.error(error);
			const ErrorChannel = client.channels.cache.find(ch => ch.id === '823271597326204999');
			ErrorChannel.send(`There was a problem with the **${command.name}** command, see details below\n\n**Server Name:** ${message.guild.name}\n**User:** ${message.author.tag}\n**Error Thrown:**\n\n\`\`\`${error}\`\`\`\n\nHope this can help debug some bugs`);
			message.channel.send('Seems like I have ran into an error executing that command, please try again and make a ticket in our Support Server.\nhttps://discord.gg/DYRXdYSa2d');
		}
	},
};