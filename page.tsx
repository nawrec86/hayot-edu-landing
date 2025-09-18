'use client';
import ContactForm from '@/components/ContactForm';

export default function ContactPage(){
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const prefill = search?.get('product') || undefined;
  return (
    <div className="container py-16 lg:py-24">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-gray-600 mt-2 max-w-2xl">Tell us about your goals. We’ll share our full catalog and send a concise proposal (no prices are listed online).</p>
      <div className="mt-8">
        <ContactForm prefill={prefill} />
      </div>
    </div>
  );
}
