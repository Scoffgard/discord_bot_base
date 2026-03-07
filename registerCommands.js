// REGISTER THE COMMANDS THROUGH DISCORD API TO ALLOW USER TO USE THEM
// As to be runned every time a command is added or renamed
// ----------

import './utils/registerEnv.js';

import fs from 'node:fs';
import path from 'node:path';
import { REST, Routes } from 'discord.js';

// Create a new REST connection to discord API with the .env defined token
const rest = new REST().setToken(process.env.TOKEN);

const commands = [];

// Select all .js files in the commands folder
const commandsPath = path.join(path.resolve(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = (await import(`file://${filePath}`)).default;
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if (command && 'data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
		console.log(`[SUCCESS] Command ${command.data.name} successfully loaded`)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const registerCommands = async () => {
	try {
		console.log(`[WARNING] Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID), 
			{ body: commands }
		);

		console.log(`[SUCCESS] Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
}
registerCommands();
