import { SlashCommandBuilder, MessageFlags } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Answers Pong!'),
	async execute(interaction) {
		await interaction.reply({content: 'Pong!', flags: MessageFlags.Ephemeral});
	},
};
