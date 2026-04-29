import 'dotenv/config';
import { z } from 'zod';
const schema = z.object({ NODE_ENV:z.string().default('production'), PORT:z.coerce.number().default(3000), SERVER_PORT:z.coerce.number().default(3000), BOT_NAME:z.string().default('AJMART'), BOT_PREFIX:z.string().default('.'), BOT_OWNER_NAME:z.string().default('AJ'), BOT_OWNER_NUMBER:z.string(), BOT_MODE:z.enum(['public','self']).default('public'), DATABASE_URL:z.string(), REDIS_URL:z.string(), JWT_SECRET:z.string(), SESSION_DIR:z.string().default('./storage/sessions'), MEDIA_DIR:z.string().default('./storage/media'), TEMP_DIR:z.string().default('./storage/temp'), MAINTENANCE_MODE:z.string().default('false') });
export const env = schema.parse(process.env);
