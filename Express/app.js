import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rate_limit from 'express-rate-limit'
import routes from './routers/index.js';
import auth_routes from './routers/auths.js';
import { handler, error_handler } from './utilities/error-handlers.js';
import { sequelize } from './models/index.js';
import request_parser from './utilities/requests.js';
import isAuth from './utilities/auths.js';
import { payment_webhook } from './controllers/payments.js';
import { get_my_certificate_doc, redirect_certification_doc } from './controllers/certifications.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(helmet());
app.use(rate_limit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(request_parser);

// Health check route
app.get('/api', (req, res) => {
    res.json('AiPLP server is live...');
});

// Authentication routes
app.use(auth_routes);

// Payment webhook and certification routes
app.use('/payments/webhook', payment_webhook);
app.use('/certifications/field/:fieldId/user/:userId/doc', get_my_certificate_doc);
app.use('/results/:resultId/link', redirect_certification_doc);

// API routes with authentication
app.use('/api/v1/', isAuth, routes);

// Serve static files
app.use('/download', express.static(path.join(__dirname, 'download')));
app.use(express.static(path.join(__dirname, 'static')));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Error handling middleware
app.use(handler);
app.use(error_handler);

if (process.env.NODE_ENV !== 'vercel') {
  sequelize.sync().then(() => {
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, (err) => {
      if (err) console.error(err);
      console.log(`Server running at ${process.env.DOMAIN || 'http://127.0.0.1' + PORT}`);
    });
  }).catch(err => console.error(err));
}
export default app;