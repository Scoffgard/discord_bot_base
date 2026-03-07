import { botImageUrl, botName } from "./consts.js";

/**
 * Execute the db.all function async
 * @param  {...any} args Args to pass to the function
 * @returns Promise for the function
 */
export const allAsync = (...args) => {
	return new Promise((resolve, reject) => {
		globalThis.database.all(...args, (err, result) => {
			if (err) reject(err);
			resolve(result);
		})
	})
}

/**
 * Execute the db.run function async
 * @param  {...any} args Args to pass to the function
 * @returns Promise for the function
 */
export const runAsync = (...args) => {
	return new Promise((resolve, reject) => {
		globalThis.database.run(...args, function (err) {
			if (err) reject(err);
			resolve(this.lastID);
		})
	})
}

/**
 * Turn number in specific string format for readability
 * @param {number} price Number to be prettied
 * @returns {string} Prettied number
 */
export const pricePrettier = price => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $`;

/**
 * Create a base embed with name and image as signature
 * @param {string} [name] The name of the bot (defaults to consts)
 * @param {string} [image] Url to the image of the bot (defaults to consts)
 * @returns Base discord.js embed object
 */
export const getBaseEmbed = (name = botName, image = botImageUrl) => { return {
	color: 0x8bad4e,
	author: {
		name: name,
		icon_url: image,
	},
	fields: [],
	footer: {
		name: name,
		icon_url: image,
	},
}};

/**
 * Turns a date in a more readable format
 * @param {Date} date The date to transform
 * @param {string} dateSep Separator text for the date
 * @param {string} hourSep Separator text fro the hours
 * @returns {[string, string]} Returns an array of the dates prettied as : [dateText, hourText] 
 */
export const datePrettier = (date, dateSep, hourSep) => [
	date.getDate().toString().padStart(2, '0') + dateSep + (date.getMonth()+1).toString().padStart(2, '0'),
	date.getHours().toString().padStart(2, '0') + hourSep + date.getMinutes().toString().padStart(2, '0')
];