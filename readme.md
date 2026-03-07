# Discord Bot Base
This is a boilerplate for a discord bot, nothing fancy but this is  pretty robust

## Setup
You have to create and populate the `.env.prod` and `.env.dev` following this :
```env
CLIENT_ID=<YOUR CLIENT ID>
TOKEN=<YOUR CLIENT SECRET TOKEN>
DB_PATH=<PATH TO YOUR DATABASE>
```
Recommended path to databases are: 
> Dev: `./databases/dev.db` \
> Prod: `./databases/main.db`

## Run
When you have a working version of your bot, you need to setup a few things before running it.

First, run `npm run init` (or `npm run dev:init` if your still in development) \
This will setup the database according to the schema defined in `setupDB.js`\
It will also register your commands to the Discord API, making you or your users able to see and use them
<sub>Note that you'll have to reload your discord client to see the commands appear</sub>

Then simply run `npm run start` (or `npm run dev` if your still in development) 


---
Made with ❤️ by Scoffgard