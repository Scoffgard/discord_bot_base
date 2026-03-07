// CREATE THE DATABASE FOLLOWING THE SCHEMA DEFINED BELOW
// ----------

import './utils/registerEnv.js';

import sqlite3 from 'sqlite3';

// Create the database connection
const database = new sqlite3.Database(process.env.DB_PATH);

// Create a table (follow SQL logic), repeat for each table
database.run("CREATE TABLE IF NOT EXISTS example (" +
	"id INTEGER PRIMARY KEY," +
	"name VARCHAR," + // etc
")");