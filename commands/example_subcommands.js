import { SlashCommandBuilder, MessageFlags, InteractionContextType } from 'discord.js';

import example_1 from './example_subcommands/example_1.js';

const command = new SlashCommandBuilder();

const subCommandList = {
	example_1, // Same as "example_1": example_1
};

command.setName('example_subcommands')
	.setDescription('example_subcommands description') // For what I saw, this is not shown anywhere
	.setContexts(InteractionContextType.Guild);

// Looping over the list of subcommands and registering the in the main command
for (let subCommandName in subCommandList) {
	command.addSubcommand((subcommand) => subCommandList[subCommandName].register(subcommand));
}

// Export the default discord JS element for a command
export default {
	data: command,
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();
		
		// If subcommand is not defined, advert user and return
		if (!subcommand || !subCommandList[subcommand]) {
			await interaction.deferReply({ flags: MessageFlags.Ephemeral});
			await interaction.editReply({content: `Subcommand not defined, please contact the developer`});
			return;
		}
		
		if (subCommandList[subcommand].saveReply) await interaction.deferReply(); // Basic reply subcommand ask for it via "saveReply"
		else await interaction.deferReply({ flags: MessageFlags.Ephemeral}); // Else, ephemeral message

		await subCommandList[subcommand].execute(interaction); // Exectute the subcommand, and passing the interaction
	},
};