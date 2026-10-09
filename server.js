const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3002;
const HOST = process.env.HOST || '0.0.0.0';
const ADMIN_PASSWORD = process.env.SNIDE_ADMIN_PASSWORD || '';
const SESSION_COOKIE = 'snide_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
const sessions = new Map();
const loginAttempts = new Map();

if (ADMIN_PASSWORD.length < 12) {
  throw new Error('Set SNIDE_ADMIN_PASSWORD to a password with at least 12 characters before starting the site.');
}

app.set('trust proxy', 1);

const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token);
  }
  for (const [address, attempts] of loginAttempts) {
    if (attempts.windowStartedAt + LOGIN_WINDOW_MS <= now && attempts.blockedUntil <= now) {
      loginAttempts.delete(address);
    }
  }
}, 10 * 60 * 1000);
cleanupTimer.unref();

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

function getClientAddress(req) {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isSameOrigin(req) {
  const origin = req.get('Origin');
  if (!origin) return true;

  try {
    return new URL(origin).host === req.get('host');
  } catch {
    return false;
  }
}

function getSession(req) {
  const cookieHeader = req.get('Cookie') || '';
  const sessionCookie = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!sessionCookie) return null;

  const token = sessionCookie.slice(SESSION_COOKIE.length + 1);
  const session = sessions.get(token);
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }

  return { token, session };
}

function getAttemptState(address) {
  const state = loginAttempts.get(address);
  if (!state || state.windowStartedAt + LOGIN_WINDOW_MS <= Date.now()) {
    const freshState = { count: 0, windowStartedAt: Date.now(), blockedUntil: 0 };
    loginAttempts.set(address, freshState);
    return freshState;
  }
  return state;
}

app.get('/api/auth/status', (req, res) => {
  res.json({ authenticated: Boolean(getSession(req)) });
});

app.post('/api/auth/login', (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).json({ error: 'طلب غير صالح.' });

  const address = getClientAddress(req);
  const attempts = getAttemptState(address);
  if (attempts.blockedUntil > Date.now()) {
    return res.status(429).json({ error: 'تم إيقاف محاولات الدخول مؤقتاً. حاول لاحقاً.' });
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  const submittedHash = crypto.createHash('sha256').update(password).digest();
  const configuredHash = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  if (!crypto.timingSafeEqual(submittedHash, configuredHash)) {
    attempts.count += 1;
    if (attempts.count >= LOGIN_MAX_ATTEMPTS) {
      attempts.blockedUntil = Date.now() + LOGIN_WINDOW_MS;
    }
    return res.status(401).json({ error: 'كلمة المرور غير صحيحة.' });
  }

  loginAttempts.delete(address);
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token);
  }

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { expiresAt: now + SESSION_DURATION_MS });
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_DURATION_MS / 1000}${req.secure ? '; Secure' : ''}`);
  res.json({ authenticated: true });
});

app.post('/api/auth/logout', (req, res) => {
  if (!isSameOrigin(req)) return res.status(403).json({ error: 'طلب غير صالح.' });
  const current = getSession(req);
  if (current) sessions.delete(current.token);
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${req.secure ? '; Secure' : ''}`);
  res.json({ authenticated: false });
});

app.get('/api/admin/session', (req, res) => {
  res.json({ authenticated: Boolean(getSession(req)) });
});

app.use(express.static(__dirname, { index: false, extensions: ['html'] }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get(['/:page.html', '/:page'], (req, res, next) => {
  const requested = req.params.page;
  if (!requested) return next();
  const target = path.join(__dirname, `${requested}.html`);
  if (fs.existsSync(target)) {
    return res.sendFile(target);
  }
  next();
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, HOST, () => {
  console.log(`SNIDE.INFO static site listening at http://${HOST}:${PORT}`);
});
