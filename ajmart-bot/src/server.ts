import { app } from './app.js'; import { env } from './config/env.js'; import { initWhatsApp } from './whatsapp/baileys.client.js'; import { logger } from './core/logger.js';
const port = env.PORT || env.SERVER_PORT || 3000;
app.listen(port, async ()=>{ logger.info(`AJMART API berjalan di ${port}`); await initWhatsApp(); });
