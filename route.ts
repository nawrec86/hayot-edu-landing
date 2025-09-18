import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

// naive in-memory rate limiter (per server instance); for production use a KV/Redis
const hits = new Map<string, {count:number; ts:number}>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 5;

function ipFrom(req: Request) {
  // behind Vercel/Node: use x-forwarded-for if present
  const fwd = req.headers.get('x-forwarded-for') || '';
  const ip = fwd.split(',')[0].trim();
  return ip || 'unknown';
}

export async function POST(req: Request) {
  try {
    const ip = ipFrom(req);
    const now = Date.now();
    const bucket = hits.get(ip) || {count:0, ts: now};
    if (now - bucket.ts > WINDOW_MS) {
      bucket.count = 0; bucket.ts = now;
    }
    bucket.count++;
    hits.set(ip, bucket);
    if (bucket.count > MAX_PER_WINDOW) {
      return NextResponse.json({ok:false, error:'Too many requests'}, {status: 429});
    }

    const data = await req.json().catch(()=> ({}));
    const {name, email, phone, city, need, website} = data || {};

    // Honeypot: if filled, it's a bot
    if (website) {
      return NextResponse.json({ok:true}); // pretend success
    }

    if (!name || !email || !need) {
      return NextResponse.json({ok:false, error:'Missing required fields'}, {status: 400});
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.TO_EMAIL || user;

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ok:false, error:'Email service not configured'}, {status: 500});
    }

    const transporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: {user, pass}
    });

    const text = `New lead from Hayot Edu Management
Time: ${new Date().toISOString()}
IP: ${ip}
Name: ${name}
Email: ${email}
Phone: ${phone || '-'}
City: ${city || '-'}
Need: ${need || '-'}
`;
    await transporter.sendMail({
      from: `"Hayot Edu Website" <${user}>`,
      to,
      subject: `New Lead: ${name}`,
      text,
      replyTo: email
    });

    return NextResponse.json({ok:true});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ok:false, error:'Server error'}, {status: 500});
  }
}

// Optional Telegram forwarding
try{
  const bot = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (bot && chat) {
    const text2 = encodeURIComponent(text);
    await fetch(`https://api.telegram.org/bot${bot}/sendMessage?chat_id=${chat}&text=${text2}`);
  }
}catch{ /* ignore */ }
