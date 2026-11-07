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
      const saved = localStorage.getItem('narvent_lang');
      if (saved === 'ru' || saved === 'en') return saved;
      // Default to Russian
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
    if (lang === 'ru') {
      document.title = 'NARVENT — Официальный сайт артиста | Official Experience';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Официальная цифровая платформа музыкального артиста Narvent (Фарход Мусулмонов). Автор вирусных мировых хитов «Memory Reboot» (Золото RIAA, #13 Billboard) и «Fainted». Кинематографичный синтвейв и 3D дискография.'
        );
      }
    } else {
      document.title = 'NARVENT — Official Experience & 3D Archive';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Official digital experience of electronic music artist Narvent (Farhod Musulmonov). Creator of viral global hits "Memory Reboot" (RIAA Gold, #13 Billboard) and "Fainted". Cinematic synthwave and spatial 3D discography.'
        );
      }
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
