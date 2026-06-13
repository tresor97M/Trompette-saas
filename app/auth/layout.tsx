import { Mic2 } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-blue-500 via-brand-blue-600 to-brand-blue-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 opacity-5 bg-hero-pattern" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-gold-400 to-brand-gold-600">
              <Mic2 className="h-6 w-6 text-brand-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none">Trompette</span>
              <span className="text-xs text-brand-gold-400 leading-none mt-0.5">SaaS</span>
            </div>
          </Link>

          {/* Testimonial */}
          <div className="max-w-md">
            <blockquote className="text-2xl font-light leading-relaxed">
              &ldquo;Trompette transformed how we manage our 80-member choir. Everything from attendance to worship planning in one place.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-brand-gold-500/20 flex items-center justify-center">
                <span className="text-brand-gold-400 font-semibold">PA</span>
              </div>
              <div>
                <p className="font-semibold">Pastor Adewole</p>
                <p className="text-sm text-brand-blue-200">Worship Director, RCCG</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-brand-blue-200">Churches</p>
            </div>
            <div>
              <p className="text-3xl font-bold">10,000+</p>
              <p className="text-sm text-brand-blue-200">Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5,000+</p>
              <p className="text-sm text-brand-blue-200">Songs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold-400 to-brand-gold-600">
                <Mic2 className="h-7 w-7 text-brand-blue-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold leading-none">Trompette</span>
                <span className="text-sm text-brand-gold-500 leading-none mt-0.5">SaaS</span>
              </div>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
