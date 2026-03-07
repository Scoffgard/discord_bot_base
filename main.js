import './utils/registerEnv.js';
import './utils/cron.js';

import fs from 'node:fs';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

import { botMOTD } from './utils/consts.js';

/**
 * Register the bot commands from the commands folder
 * @param {Client} client The discord.js client to register commands on
 */
const registerCommands = async (client) => {
	// Select all .js files in the commands folder
	const commandsPath = path.join(path.resolve(), 'commands');
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) { // For each file
		const filePath = path.join(commandsPath, file);
		const command = (await import(`file://${filePath}`)).default;
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if (command && 'data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log(`[SUCCESS] Command ${command.data.name} successfully registered`);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

/**
 * Register the bot events from the events folder
 * @param {Client} client The discord.js client to register events on
 */
const registerEvents = async (client) => {
	// Select all .js files in the events folder
	const eventsPath = path.join(path.resolve(), 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = (await import(`file://${filePath}`)).default;
		// Register the event
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

/**
 * Main function, called at launch
 */
(() => {
	// Create database connection and store it globaly
	globalThis.database = new sqlite3.Database(process.env.DB_PATH);

	// Create discord client and store it globaly
	const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
	globalThis.discordClient = client;

	// Create an empty command collection
	client.commands = new Collection();

	// Register all the commands and events
	registerCommands(client);
	registerEvents(client);

	// Actions to do when client is ready
	client.on(Events.ClientReady, readyClient => {
		console.log(`[SUCCESS] Logged in as ${readyClient.user.tag}!`);
	
		client.user.setPresence({ activities: [{ name: botMOTD, type: 3 }], status: 'online'});
	
	});
	
	
	// Actions to do when an interaction is created and it's a chat command
	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;
	
		const command = interaction.client.commands.get(interaction.commandName);
	
		// If the command is not found error and return
		if (!command) {
			console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
			return;
		}
	
		// Try to execute the command function
		try { 
			await command.execute(interaction);
		} catch (error) { // If there is an error thrown, error the console and reply to the user
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	});
	
	// Connect the client with the .env defined token
	client.login(process.env.TOKEN);
})();

