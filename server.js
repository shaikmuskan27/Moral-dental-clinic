// Local Development Server
// Serves static files and handles /api/create-retell-call locally for testing.
// Usage: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

// Basic .env parser so user can create .env locally without installing dotenv
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.slice(0, eqIndex).trim();
        let val = trimmed.slice(eqIndex + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
  console.log('Loaded local .env file');
}

const apiHandler = require('./api/create-retell-call');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // Handle /api/create-retell-call
  if (pathname === '/api/create-retell-call') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk;
    });
    req.on('end', () => {
      req.body = bodyData;
      // Mock Express/Vercel res helper methods
      res.status = function(code) {
        this.statusCode = code;
        return this;
      };
      res.json = function(data) {
        this.setHeader('Content-Type', 'application/json');
        this.end(JSON.stringify(data));
      };
      apiHandler(req, res);
    });
    return;
  }

  // Handle static files
  let safePath = pathname === '/' ? '/index.html' : pathname;
  let filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
});

let currentPort = parseInt(process.env.PORT, 10) || 3000;

function startServer(port) {
  server.listen(port, () => {
    console.log(`\x1b[32m%s\x1b[0m`, `✓ Dental Clinic server running at http://localhost:${port}`);
    console.log(`✓ Backend API ready at http://localhost:${port}/api/create-retell-call`);
    if (!process.env.RETELL_API_KEY) {
      console.warn('\x1b[33m%s\x1b[0m', '⚠ Warning: RETELL_API_KEY is not set. Please add it to your .env file.');
    } else {
      console.log('\x1b[32m%s\x1b[0m', '✓ RETELL_API_KEY is configured.');
    }
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${currentPort} is in use, trying port ${currentPort + 1}...`);
    currentPort++;
    startServer(currentPort);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);
