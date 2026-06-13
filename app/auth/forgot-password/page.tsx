'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast({
        title: 'Email sent',
        description: 'Check your inbox for password reset instructions.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-brand-emerald-500/10 flex items-center justify-center">
          <Mail className="h-8 w-8 text-brand-emerald-500" />
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground mt-2">
            We sent a password reset link to<br />
            <span className="font-medium text-foreground">{submittedEmail}</span>
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>
            Click the link in the email to reset your password. If you do not see the email, check your spam folder.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            className="w-full bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900"
            onClick={() => setIsSubmitted(false)}
          >
            Resend email
          </Button>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/auth/login"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to sign in
      </Link>

      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground mt-1">
          No worries, we will send you reset instructions.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@church.com"
            {...register('email')}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-blue-900 border-t-transparent" />
              Sending...
            </div>
          ) : (
            'Reset password'
          )}
        </Button>
      </form>

      {/* Help */}
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link href="/auth/login" className="text-brand-gold-600 hover:text-brand-gold-500 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
