module.exports = {
	name: 'reload',
	aliases: ['restartcmd', 'load', 'cmdup'],
	description: 'Reloads a command without restarting the whole bot.',
	args: true,
	usage: '<command>',
	guildOnly: false,
	ownerOnly: true,
	cooldown: 15,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send('That isn\'t a valid command! Smh your my owner');
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Successfully reloaded **${command.name}** command.`);
			console.log(`Reloaded ${command.name} command`);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading the command, \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};