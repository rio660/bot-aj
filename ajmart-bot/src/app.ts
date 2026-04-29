import express from 'express'; import { apiRouter } from './routes/index.js';
export const app = express(); app.use(express.json({ limit: '2mb' })); app.use('/api', apiRouter);
