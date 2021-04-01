module.exports = {
	name: 'ready',
	once: true,
	async execute(currentVersion, client) {
		client.user.setActivity(`${client.guilds.cache.size} servers 👀`, { type: 'WATCHING' });
		console.log(`Cheesio version ${currentVersion} has fully started up!`);
	},
};