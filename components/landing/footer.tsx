'use client';

import * as React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { Mic2 } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', translationKey: 'navbar.features', href: '#features' },
    { label: 'Pricing', translationKey: 'navbar.pricing', href: '#pricing' },
    { label: 'Testimonials', translationKey: 'navbar.testimonials', href: '#testimonials' },
    { label: 'FAQ', translationKey: 'navbar.faq', href: '#faq' },
    { label: 'Changelog', translationKey: 'common.loading', href: '/changelog' }, // Fallback standard
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Help Center', href: '/help' },
    { label: 'Blog', href: '/blog' },
    { label: 'Community', href: '/community' },
    { label: 'API Reference', href: '/api' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press Kit', href: '/press' },
    { label: 'Partners', href: '/partners' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/trompette_saas',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/trompette_saas',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/trompette_saas',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.047 1.024.06 1.378.06 3.808s-.013 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772 4.903 4.903 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.047-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.378-.06-3.808s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.255 2 11.685 2H12.315zM12 0C9.505 0 9.124.012 8.072.06 7.016.108 6.28.276 5.635.493c-.658.232-1.23.585-1.775 1.098a4.587 4.587 0 00-1.098 1.775c-.217.645-.385 1.38-.433 2.437C2.012 6.853 2 7.234 2 9.73c0 2.495.012 2.876.06 3.928.048 1.056.216 1.792.433 2.437a4.587 4.587 0 001.098 1.775c.545.513 1.117.866 1.775 1.098.645.217 1.38.385 2.437.433 1.052.048 1.433.06 3.928.06 2.495 0 2.876-.012 3.928-.06 1.056-.048 1.792-.216 2.437-.433.658-.232 1.23-.585 1.775-1.098a4.587 4.587 0 001.098-1.775c.217-.645.385-1.38.433-2.437.048-1.052.06-1.433.06-3.928 0-2.495-.012-2.876-.06-3.928-.048-1.056-.216-1.792-.433-2.437a4.587 4.587 0 00-1.098-1.775c-.545-.513-1.117-.866-1.775-1.098-.645-.217-1.38-.385-2.437-.433C14.876.012 14.495 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/trompette_saas',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-blue-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold-400 to-brand-gold-600">
                <Mic2 className="h-6 w-6 text-brand-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">Trompette</span>
                <span className="text-xs text-brand-gold-400 leading-none mt-0.5">SaaS</span>
              </div>
            </Link>
            <p className="text-brand-blue-200 text-sm max-w-xs">
              {t('footer.desc')}
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue-200 hover:text-brand-gold-400 transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.product')}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-blue-200 hover:text-brand-gold-400 transition-colors"
                  >
                    {t(link.translationKey || '') || link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-blue-200 hover:text-brand-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-blue-200 hover:text-brand-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-blue-400/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-brand-blue-200">
              &copy; {new Date().getFullYear()} Trompette SaaS. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-blue-200 hover:text-brand-gold-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
