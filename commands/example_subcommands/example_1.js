export default {
	register: (subcommand) => subcommand
		.setName('example_1')
		.setDescription('This is the description of the "/example_subcommands example_1" command')
		.addStringOption(option => 
			option.setName('myStringOption')
			.setDescription('myStringOption description')
			.setRequired(true)),
	saveReply: true, // DOES THE BOT NEED SAVE THE REPLY IN CHANNEL OR NOT
	async execute(interaction) {
		const myString = interaction.options.getString('myStringOption');

		try {
			
		} catch (e) {
			await interaction.editReply({content: `Error while executing the command, please contact developer`});
			console.error(e);
			return;
		}
	},
};