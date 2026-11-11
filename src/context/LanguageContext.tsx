import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ru',
  setLang: () => {},
  toggleLang: () => {},
  t: translations.ru,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'ru' || urlLang === 'en') {
        return urlLang;
      }
      const saved = localStorage.getItem('narvent_lang');
      if (saved === 'ru' || saved === 'en') return saved;
      return 'ru';
    } catch {
      return 'ru';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('narvent_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'ru' ? 'en' : 'ru');
  };

  useEffect(() => {
    document.documentElement.lang = lang;

    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    const canonicalHref =
      urlLang === 'en'
        ? 'https://www.narventmusic.com/?lang=en'
        : urlLang === 'ru'
          ? 'https://www.narventmusic.com/?lang=ru'
          : 'https://www.narventmusic.com/';

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', canonicalHref);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalHref);

    if (lang === 'ru') {
      const title = 'NARVENT — Официальный сайт артиста | Official Artist Website';
      const desc =
        'Официальный сайт музыкального артиста Narvent (Фарход Мусулмонов / Farkhod Musulmonov) — narventmusic.com. Автор мировых хитов «Memory Reboot» (Золото RIAA, #13 Billboard) и «Fainted». Кинематографичный синтвейв, новые релизы и интерактивная 3D-дискография.';
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
    } else {
      const title = 'NARVENT — Official Artist Website & 3D Discography';
      const desc =
        'Official website of electronic music artist Narvent (Farkhod Musulmonov) — narventmusic.com. Creator of viral global hits "Memory Reboot" (RIAA Gold, #13 Billboard) and "Fainted". Cinematic synthwave and spatial 3D discography.';
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
