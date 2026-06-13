import { useLanguageStore } from '@/stores';
import { translations } from '@/lib/translations';

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const t = (path: string, variables?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let result: any = translations[language];

    for (const key of keys) {
      if (result && key in result) {
        result = result[key];
      } else {
        // Fallback to English if key not found in current language
        let fallback: any = translations['en'];
        for (const fk of keys) {
          if (fallback && fk in fallback) {
            fallback = fallback[fk];
          } else {
            fallback = null;
            break;
          }
        }
        return fallback || path;
      }
    }

    if (typeof result === 'string') {
      if (variables) {
        let text = result;
        for (const [key, val] of Object.entries(variables)) {
          text = text.replace(new RegExp(`{${key}}`, 'g'), String(val));
        }
        return text;
      }
      return result;
    }

    return path;
  };

  return { t, language, setLanguage };
}
