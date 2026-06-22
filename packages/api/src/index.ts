import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for frontend
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Newsletter Signup
app.post('/api/newsletter', async (c) => {
  try {
    const { email } = await c.req.json();
    if (!email || !email.includes('@')) {
      return c.json({ error: 'Invalid email address' }, 400);
    }

    await c.env.DB.prepare(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)'
    ).bind(email).run();

    return c.json({ success: true, message: 'Subscribed successfully!' });
  } catch (err: any) {
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
      return c.json({ success: true, message: 'You are already subscribed!' });
    }
    return c.json({ error: 'Failed to subscribe' }, 500);
  }
});

// Contact Message
app.post('/api/contact', async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();
    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    await c.env.DB.prepare(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
    ).bind(name, email, subject || '', message).run();

    return c.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    return c.json({ error: 'Failed to send message' }, 500);
  }
});

// Bookings & Stripe Integration
app.post('/api/bookings', async (c) => {
  try {
    const { name, email, date, time_slot, package_type } = await c.req.json();
    if (!name || !email || !date || !time_slot || !package_type) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const stripe_session_id = 'mock_session_' + Math.random().toString(36).substring(2, 11);

    await c.env.DB.prepare(
      'INSERT INTO bookings (name, email, date, time_slot, package_type, stripe_session_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(name, email, date, time_slot, package_type, stripe_session_id, 'pending').run();

    return c.json({
      success: true,
      message: 'Booking initialized successfully!',
      stripe_session_id
    });
  } catch (err) {
    return c.json({ error: 'Failed to create booking' }, 500);
  }
});

export default app;
