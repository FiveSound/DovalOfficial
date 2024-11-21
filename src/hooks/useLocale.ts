import { useState, useEffect } from 'react';
import i18next from '../Translate';

const useLocale = () => {
  const [locale, setLocale] = useState<string>(i18next.language);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setLocale(lng);
    };
    return () => {
      i18next.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return locale;
};

export default useLocale;