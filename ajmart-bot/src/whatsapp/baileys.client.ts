import makeWASocket, { DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import { Boom } from '@hapi/boom';
import { logger } from '../core/logger.js';
import { env } from '../config/env.js';
import { routeIncomingMessage } from './message-router.js';
export let sock: ReturnType<typeof makeWASocket>;
export async function initWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(env.SESSION_DIR);
  const { version } = await fetchLatestBaileysVersion();
  sock = makeWASocket({ version, auth: state, logger, printQRInTerminal: false });
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) qrcode.generate(qr, { small: true });
    if (connection === 'close') {
      const code = (lastDisconnect?.error as Boom)?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) setTimeout(initWhatsApp, 3000);
    }
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('messages.upsert', routeIncomingMessage);
}
export async function safeSendMessage(jid: string, content: any) { await new Promise(r => setTimeout(r, 400)); return sock.sendMessage(jid, content); }
