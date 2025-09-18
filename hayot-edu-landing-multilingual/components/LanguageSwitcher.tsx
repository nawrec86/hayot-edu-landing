"use client";
import {useLocale} from 'next-intl';
import {locales, usePathname, useRouter} from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.push(pathname, {locale: l})}
          className={`px-2 py-1 rounded-lg border ${l===locale ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50'}`}
          aria-pressed={l===locale}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
