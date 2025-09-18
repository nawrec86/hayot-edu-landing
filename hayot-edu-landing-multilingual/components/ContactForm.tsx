'use client';
import { ShieldCheck, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function ContactForm({prefill}:{prefill?: string}){
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState('');
  const [need, setNeed] = useState(prefill ? `I am interested in: ${prefill}` : '');

  async function onSubmit(e:any){
    e.preventDefault();
    const f = e.currentTarget;
    const form = {
      name: f.name.value, email: f.email.value, phone: f.phone.value,
      city: f.city.value, need: f.need.value, website: f.website.value
    };
    if(!form.name || !form.email || !form.need){
      setMsg('Please fill the required fields.');
      return;
    }
    setSending(true); setMsg('');
    try{
      const res = await fetch('/api/contact', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const j = await res.json();
      if(j.ok){ setMsg('Thank you! We will contact you shortly.'); f.reset(); setNeed(''); }
      else{ setMsg('Error: ' + (j.error || 'Please try again.')); }
    }catch{ setMsg('Network error. Please try again.'); }
    finally{ setSending(false); }
  }

  return (
    <Card className="rounded-3xl">
      <CardContent className="p-6">
        <form className="grid sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
          <div className="sm:col-span-1">
            <label className="text-sm">Full Name</label>
            <input name="name" className="input mt-1" placeholder="Your name" required />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm">Email</label>
            <input name="email" type="email" className="input mt-1" placeholder="you@example.com" required />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm">Phone / WhatsApp</label>
            <input name="phone" className="input mt-1" placeholder="+998…" />
          </div>
          <div className="sm:col-span-1">
            <label className="text-sm">City / Country</label>
            <input name="city" className="input mt-1" placeholder="Tashkent, Uzbekistan" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">What do you need help with?</label>
            <textarea name="need" className="input mt-1 h-28" placeholder="Example: Launching K–12 school; admissions & HR; FCL equipment; CPT assessments…" value={need} onChange={(e)=>setNeed(e.target.value)} required />
          </div>
          {/* Honeypot */}
          <input type="hidden" name="productSlug" value={productSlug} />
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-gray-500 flex items-center gap-2"><ShieldCheck className="h-4 w-4" />We’ll reply within 24 hours.</div>
            <div className="flex items-center gap-2">
              <Button id="submitBtn" type="submit" className="gap-2" disabled={sending}>
                {sending ? 'Sending…' : <>Send <ArrowRight className="h-4 w-4" /></>}
              </Button>
              <a href={process.env.NEXT_PUBLIC_WHATSAPP ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent('Hello! I would like to ask about: ' + (prefill || ''))}` : '#'} target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp</a>
              {process.env.NEXT_PUBLIC_WHATSAPP_ALT ? <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_ALT}?text=${encodeURIComponent("Hello! I would like to ask about: " + (prefill || ""))}`} target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp 2</a> : null}
              <a href={process.env.NEXT_PUBLIC_TELEGRAM ? `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM}` : '#'} target="_blank" rel="noreferrer" className="btn btn-outline">Telegram</a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'kilinc.metin@hotmail.com'}?subject=Website%20Inquiry&body=${encodeURIComponent(need || '')}`} className="btn btn-outline">Email</a>
            </div>
          </div>
          <div id="formMsg" className="text-sm mt-2">{msg}</div>
        </form>
        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3"><Mail className="h-5 w-5" /><div><div className="text-gray-500 text-xs">Email</div><div className="font-medium">{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'kilinc.metin@hotmail.com'}</div></div></div>
          <div className="flex items-center gap-3"><Phone className="h-5 w-5" /><div><div className="text-gray-500 text-xs">Phone</div><div className="font-medium">{process.env.NEXT_PUBLIC_CONTACT_PHONE || '+998 xx xxx xx xx'}</div></div></div>
          <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /><div><div className="text-gray-500 text-xs">Location</div><div className="font-medium">Tashkent, Uzbekistan</div></div></div>
        </div>
      </CardContent>
    </Card>
  );
}
