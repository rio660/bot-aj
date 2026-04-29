# AJMART - WhatsApp MD Store Bot

## Arsitektur Singkat
- WhatsApp Adapter Layer (`src/whatsapp`) memakai Baileys dan wrapper kirim pesan aman + reconnect.
- Message Router Layer (`message-router.ts`) untuk parsing command, cooldown, logging.
- Command Layer (`src/commands`) modular registry.
- Store/Admin API Layer (`src/routes`) berbasis Express + Prisma.
- Data Layer (`prisma/schema.prisma`) PostgreSQL + Redis untuk queue/rate-limit.
- Dashboard Layer (`dashboard/`) React + Vite minimal.

## Fitur Utama
- Store bot (katalog, cart, checkout, invoice).
- Utility command modular.
- Admin automation (produk/order/broadcast/settings).
- Keamanan: cooldown command, logging, struktur siap rate limit Redis.

## Catatan Keamanan
AJMART **tidak mengimplementasikan fitur abuse** seperti crash/virtex/raid/mass-report/exploit. Fokus hanya otomasi yang aman dan patuh kebijakan.

## Instalasi Lokal
1. `cp .env.example .env`
2. Isi variabel env.
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate deploy`
6. `npm run seed`
7. `npm run dev`

## Setup PostgreSQL dan Redis
- Gunakan service eksternal atau lokal.
- Isi `DATABASE_URL` dan `REDIS_URL` di `.env`.

## Menjalankan Bot
- Development: `npm run dev`
- Production: `npm run build && npm run start`
- Scan QR Baileys dari console saat pertama kali run.

## Session Handling
- Session disimpan di `storage/sessions`.
- Backup berkala direkomendasikan via cron/pterodactyl backup.
- Jangan commit folder session ke git.

## Dashboard
- Masuk folder `dashboard` lalu `npm install && npm run dev`.
- Login page minimal disediakan sebagai fondasi.

## Deploy Pterodactyl
Startup command development:
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build && npm run start
```
Startup production setelah build:
```bash
npm run start
```
Gunakan env `PORT`/`SERVER_PORT` dari panel.

## Troubleshooting
- QR tidak muncul: cek log koneksi dan pastikan session bersih.
- Session logout: backup/restore folder `storage/sessions`.
- Database/Redis error: verifikasi URL dan firewall.
- Bot tidak merespons: cek prefix, mode bot, dan log command.
- Port error Pterodactyl: pastikan bind ke `process.env.PORT`.
- Media gagal simpan: cek permission folder `storage/media`.
