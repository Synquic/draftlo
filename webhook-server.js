#!/usr/bin/env node
/**
 * Draftlo Deploy Webhook Server
 * Listens for GitHub push events and auto-deploys the app.
 *
 * Setup: see WEBHOOK_SETUP.md
 */

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || '';
const DEPLOY_DIR = process.env.DEPLOY_DIR || '/root/draftlo';

function verify(secret, payload, signature) {
  if (!secret) return true; // skip if no secret set (not recommended)
  const hmac = 'sha256=' + crypto.createHmac('sha256', secret).update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(signature || ''));
  } catch {
    return false;
  }
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/deploy') {
    res.writeHead(404);
    return res.end('Not found');
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const sig = req.headers['x-hub-signature-256'];

    if (!verify(SECRET, body, sig)) {
      console.error('[webhook] Invalid signature — rejected');
      res.writeHead(401);
      return res.end('Unauthorized');
    }

    let event;
    try { event = JSON.parse(body); } catch { event = {}; }

    // Only deploy on pushes to main
    if (event.ref && event.ref !== 'refs/heads/main') {
      res.writeHead(200);
      return res.end('Ignored (not main)');
    }

    console.log('[webhook] Push to main received — deploying...');
    res.writeHead(200);
    res.end('Deploying');

    const cmd = `cd ${DEPLOY_DIR} && git pull origin main && docker-compose up -d --build && docker system prune -f`;
    exec(cmd, { timeout: 300000 }, (err, stdout, stderr) => {
      if (err) {
        console.error('[deploy] Error:', err.message);
        console.error(stderr);
      } else {
        console.log('[deploy] Success');
        console.log(stdout);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`[webhook] Listening on port ${PORT}`);
  console.log(`[webhook] Deploy directory: ${DEPLOY_DIR}`);
  console.log(`[webhook] Secret check: ${SECRET ? 'enabled' : 'DISABLED (set WEBHOOK_SECRET)'}`);
});
