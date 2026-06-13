'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  if (submitted) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-emerald-500/10 mb-6">
            <svg className="h-8 w-8 text-brand-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">{t('newsletter.success')}</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold-500/10 mb-6">
          <Send className="h-8 w-8 text-brand-gold-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{t('newsletter.title')}</h3>
        <p className="text-muted-foreground mb-8">
          {t('newsletter.description')}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
            {t('newsletter.subscribe')}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-4">
          {t('language') === 'fr' ? 'Pas de spam. Désabonnez-vous à tout moment.' : 'No spam. Unsubscribe anytime.'}
        </p>
      </div>
    </section>
  );
}
