const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	client.user.setActivity(`${client.guilds.cache.size} servers 👀`, { type: 'WATCHING' });
	console.log('Cheesio has fully started up!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.channel.send('I can\'t execute that command inside DMs!');
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
	const cooldownAmount = (command.cooldown || 5) * 1000;

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
	}
	catch(error) {
		console.error(error);
		message.channel.send('Seems like I have ran into an error executing that command, please try again and make a ticket in our Support Server.\nhttps://discord.gg/DYRXdYSa2d');
	}
});

// Token (keep safe)
client.login(token); // Login using token
