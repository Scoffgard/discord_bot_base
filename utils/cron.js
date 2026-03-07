import cron from "node-cron";

cron.schedule('0 20 * * *', async () => {
  // Do something everyday at 20h00
}, { timezone: 'Europe/Paris' });