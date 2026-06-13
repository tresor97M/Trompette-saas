'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { translations } from '@/lib/translations';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number | null;
  currency: string;
  period: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular: boolean;
}

export function PricingSection() {
  const { t, language } = useTranslation();
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'free',
      name: translations[language].pricing.free.title,
      description: translations[language].pricing.free.desc,
      price: 0,
      currency: 'USD',
      period: 'forever',
      features: translations[language].pricing.free.features,
      cta: translations[language].hero.getStarted,
      ctaLink: '/auth/register',
      popular: false,
    },
    {
      id: 'standard',
      name: translations[language].pricing.standard.title,
      description: translations[language].pricing.standard.desc,
      price: 29,
      currency: 'USD',
      period: 'per month',
      features: translations[language].pricing.standard.features,
      cta: translations[language].pricing.startTrial,
      ctaLink: '/auth/register?plan=standard',
      popular: true,
    },
    {
      id: 'premium',
      name: translations[language].pricing.premium.title,
      description: translations[language].pricing.premium.desc,
      price: 49,
      currency: 'USD',
      period: 'per month',
      features: translations[language].pricing.premium.features,
      cta: translations[language].pricing.startTrial,
      ctaLink: '/auth/register?plan=premium',
      popular: false,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: translations[language].pricing.premium.desc, // fallback
      price: null,
      currency: 'USD',
      period: 'custom pricing',
      features: language === 'fr' ? [
        'Tout ce qui est dans Premium',
        'Gestion multi-églises',
        'Branding personnalisé',
        'Gestionnaire de compte dédié',
        'Stockage illimité',
      ] : [
        'Everything in Premium',
        'Multi-church management',
        'Custom branding',
        'Dedicated account manager',
        'Unlimited storage',
      ],
      cta: language === 'fr' ? 'Contacter le service commercial' : 'Contact Sales',
      ctaLink: '/contact',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-brand-gold-500 tracking-wide uppercase">
            {t('pricing.badge')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('pricing.description')}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn('text-sm', billingPeriod === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground')}>
            {t('pricing.monthly')}
          </span>
          <button
            className={cn(
              'relative w-14 h-8 rounded-full transition-colors',
              billingPeriod === 'yearly' ? 'bg-brand-gold-500' : 'bg-muted'
            )}
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          >
            <div className={cn(
              'absolute top-1 w-6 h-6 rounded-full bg-white transition-transform',
              billingPeriod === 'yearly' ? 'translate-x-7' : 'translate-x-1'
            )} />
          </button>
          <span className={cn('text-sm', billingPeriod === 'yearly' ? 'text-foreground font-medium' : 'text-muted-foreground')}>
            {t('pricing.yearly')}
            <Badge variant="secondary" className="ml-2 text-xs">Save 20%</Badge>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative bg-card rounded-2xl border p-6 flex flex-col',
                plan.popular
                  ? 'border-brand-gold-500 shadow-glow-gold'
                  : 'border-border/50'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-brand-gold-500 text-brand-blue-900 font-semibold">
                    {t('pricing.popular')}
                  </Badge>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>

              {/* Price */}
              <div className="mt-6 mb-6">
                {plan.price !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">
                      ${billingPeriod === 'yearly' ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingPeriod === 'yearly' ? 'mo' : 'mo'}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">Custom</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-brand-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={cn(
                  'mt-6 w-full',
                  plan.popular
                    ? 'bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900'
                    : ''
                )}
                variant={plan.popular ? 'default' : 'outline'}
                asChild
              >
                <Link href={plan.ctaLink}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          All prices are in USD. Churches in Africa can request local currency pricing and special rates.
        </p>
      </div>
    </section>
  );
}
