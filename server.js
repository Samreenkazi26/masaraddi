import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { hospitalConfig } from './src/config/hospitalConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Public hospital info endpoint
app.get('/api/hospital-info', (_req, res) => {
  res.json({
    hospitalName: hospitalConfig.hospitalName,
    doctor: hospitalConfig.doctors[0].name,
    specialization: hospitalConfig.doctors[0].specialization,
    timings: hospitalConfig.contact.timings,
    address: hospitalConfig.contact.address.full,
    phone: hospitalConfig.contact.phoneDisplay,
  });
});

// Serve frontend assets in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Masaraddi Neuro Care Center</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #080E1A; color: #F8FAFC; text-align: center; padding: 20px; }
            .card { background: #0F172A; border: 1px solid #1E293B; padding: 32px; border-radius: 20px; max-width: 520px; }
            h1 { font-size: 20px; color: #38BDF8; margin-top: 0; }
            code { background: #1E293B; color: #7DD3FC; padding: 3px 8px; border-radius: 6px; font-family: monospace; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Masaraddi Neuro Care Center</h1>
            <p>Production build directory <code>dist/</code> was not found.</p>
            <p>For development with live reloading, run:<br><code>npm run dev</code></p>
            <p>To build for production first, run:<br><code>npm run build && npm start</code></p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`Masaraddi Neuro Care Center server running on http://localhost:${PORT}`);
});
