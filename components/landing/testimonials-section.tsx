'use client';

import * as React from 'react';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/hooks/useTranslation';

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: '1',
      name: t('testimonials.t1.author'),
      role: t('testimonials.t1.role'),
      church: t('testimonials.t1.church'),
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: t('testimonials.t1.content'),
      rating: 5,
    },
    {
      id: '2',
      name: t('testimonials.t2.author'),
      role: t('testimonials.t2.role'),
      church: t('testimonials.t2.church'),
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: t('testimonials.t2.content'),
      rating: 5,
    },
    {
      id: '3',
      name: t('testimonials.t3.author'),
      role: t('testimonials.t3.role'),
      church: t('testimonials.t3.church'),
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: t('testimonials.t3.content'),
      rating: 5,
    },
    {
      id: '4',
      name: t('testimonials.t4.author'),
      role: t('testimonials.t4.role'),
      church: t('testimonials.t4.church'),
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: t('testimonials.t4.content'),
      rating: 5,
    },
    {
      id: '5',
      name: t('testimonials.t5.author'),
      role: t('testimonials.t5.role'),
      church: t('testimonials.t5.church'),
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: t('testimonials.t5.content'),
      rating: 5,
    },
    {
      id: '6',
      name: t('testimonials.t6.author'),
      role: t('testimonials.t6.role'),
      church: t('testimonials.t6.church'),
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      content: t('testimonials.t6.content'),
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-brand-gold-500 tracking-wide uppercase">
            {t('testimonials.badge')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-card rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-brand-gold-500/30 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-12 w-12 text-brand-gold-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-gold-500 text-brand-gold-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-brand-gold-500/10 text-brand-gold-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-brand-gold-500">{testimonial.church}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
