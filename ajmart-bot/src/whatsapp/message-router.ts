import { getCommand } from '../commands/index.js';
import { env } from '../config/env.js';
import { safeSendMessage } from './baileys.client.js';
import { prisma } from '../config/database.js';
const cooldown = new Map<string, number>();
export async function routeIncomingMessage({ messages }: any) {
  const m = messages?.[0]; if (!m?.message || m.key.fromMe) return;
  const jid = m.key.remoteJid; const sender = m.key.participant || jid;
  const text = m.message.conversation || m.message.extendedTextMessage?.text || '';
  await prisma.messageLog.create({ data: { fromNumber: sender, body: text } });
  const prefix = env.BOT_PREFIX;
  if (!text.startsWith(prefix)) return;
  const [raw, ...args] = text.slice(prefix.length).trim().split(/\s+/); const cmd = raw.toLowerCase();
  const hit = getCommand(cmd); if (!hit) return;
  const key = `${sender}:${hit.name}`; const now = Date.now(); if ((cooldown.get(key) || 0) > now) return;
  cooldown.set(key, now + (hit.cooldown*1000));
  const reply = (t: string) => safeSendMessage(jid, { text: t });
  try { await hit.execute({ m, args, reply, sender, jid }); await prisma.commandLog.create({ data: { command: hit.name, sender, success: true, durationMs: 0 } }); }
  catch { await reply('Terjadi error command'); await prisma.commandLog.create({ data: { command: hit.name, sender, success: false, durationMs: 0 } }); }
}
