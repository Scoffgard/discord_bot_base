// CREATE THE DATABASE FOLLOWING THE SCHEMA DEFINED BELOW
// ----------

import './utils/registerEnv.js';

import Database from 'better-sqlite3';

// Create the database connection
const database = new Database(process.env.DB_PATH);

// Create a table (follow SQL logic), repeat for each table
database.prepare("CREATE TABLE IF NOT EXISTS example (" +
	"id INTEGER PRIMARY KEY," +
	"name VARCHAR," + // etc
")").run();