import fs from 'node:fs';
import { env } from '../config/env.js';
export const ensureSessionDir = () => fs.mkdirSync(env.SESSION_DIR, { recursive: true });
