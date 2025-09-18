"use client";
import {useEffect, useState} from 'react';
import Link from 'next/link';

type Product = {slug:string; brand:string; name:string; desc:string; image:string; category:string; action:string};

export default function ProductsPage({params}:{params:{locale:string}}){
  const [items, setItems] = useState<Product[]>([]);
  useEffect(()=>{
    (async()=>{
      const res = await fetch('/data/products.json');
      const data = await res.json();
      setItems(data);
    })();
  },[]);
  const { locale } = { locale: (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en') };
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="text-gray-600 mt-2">Browse our ClassVR, Makeblock, Twin Science, Elecfreaks and CPT solutions. Click “Request Info” to prefill the form.</p>
      <div className="mt-3 text-sm bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl p-3">
        We don’t publish prices online. Contact us and we’ll share the full catalog and recommend the right configuration for your school.
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => (
          <div key={p.slug} className="card">
            <div className="card-content">
              <div className="h-12 flex items-center justify-center">
                <img src={p.image} alt={p.brand} className="h-10 object-contain" />
              </div>
              <div className="mt-4 text-sm text-gray-500">{p.brand} • {p.category}</div>
              <div className="text-lg font-semibold">{p.name}</div>

              <p className="text-gray-600 mt-2">{p.desc}</p>
              <div className="mt-4 flex items-center gap-2">
                <Link href={`/${locale}?product=${encodeURIComponent(p.name)}#contact`} className="btn btn-primary">{p.action}</Link>
                <Link href={`/${locale}/brands/${p.brand.toLowerCase().replace(/\s+/g,'-')}`} className="btn btn-outline">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
