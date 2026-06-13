'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader } from '@/components/shared';
import {
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Camera,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const { t, language, setLanguage } = useTranslation();
  const [activeSection, setActiveSection] = React.useState('profile');

  const settingsNav = [
    { id: 'profile', label: t('settings.profile'), icon: User },
    { id: 'church', label: t('settings.church'), icon: Building },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'security', label: t('settings.security'), icon: Shield },
    { id: 'billing', label: t('settings.billing'), icon: CreditCard },
    { id: 'appearance', label: t('settings.appearance'), icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('settings.title')}
        description={t('settings.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {settingsNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-brand-gold-500/10 text-brand-gold-600'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('settings.profileInfo.title')}</CardTitle>
                  <CardDescription>{t('settings.profileInfo.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200" />
                      <AvatarFallback className="text-xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        {t('settings.profileInfo.changeAvatar')}
                      </Button>
                      <p className="text-xs text-muted-foreground">{t('settings.profileInfo.avatarDesc')}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t('settings.profileInfo.firstName')}</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t('settings.profileInfo.lastName')}</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('settings.profileInfo.email')}</Label>
                      <Input id="email" type="email" defaultValue="john@church.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('settings.profileInfo.phone')}</Label>
                      <Input id="phone" defaultValue="+234 801 234 5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voiceType">{t('settings.profileInfo.voiceType')}</Label>
                      <Select defaultValue="tenor">
                        <SelectTrigger>
                          <SelectValue placeholder={t('settings.profileInfo.selectVoice')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="soprano">Soprano</SelectItem>
                          <SelectItem value="alto">Alto</SelectItem>
                          <SelectItem value="tenor">Tenor</SelectItem>
                          <SelectItem value="bass">Bass</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">{t('settings.profileInfo.timezone')}</Label>
                      <Select defaultValue="africa-lagos">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="africa-lagos">Africa/Lagos (GMT+1)</SelectItem>
                          <SelectItem value="africa-nairobi">Africa/Nairobi (GMT+3)</SelectItem>
                          <SelectItem value="africa-accra">Africa/Accra (GMT+0)</SelectItem>
                          <SelectItem value="africa-johannesburg">Africa/Johannesburg (GMT+2)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                      {t('settings.profileInfo.save')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Church Settings */}
          {activeSection === 'church' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.churchInfo.title')}</CardTitle>
                <CardDescription>{t('settings.churchInfo.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="churchName">{t('settings.churchInfo.name')}</Label>
                  <Input id="churchName" defaultValue="Grace Community Church" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="churchEmail">{t('settings.profileInfo.email')}</Label>
                    <Input id="churchEmail" type="email" defaultValue="info@gracecommunity.org" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="churchPhone">{t('settings.profileInfo.phone')}</Label>
                    <Input id="churchPhone" defaultValue="+234 801 234 5678" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="churchAddress">Address</Label>
                  <Input id="churchAddress" defaultValue="15 Worship Avenue, Lagos, Nigeria" />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                    {t('settings.profileInfo.save')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.notificationPreferences.title')}</CardTitle>
                <CardDescription>{t('settings.notificationPreferences.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { id: 'email', label: t('settings.notificationPreferences.email'), description: t('settings.notificationPreferences.emailDesc') },
                    { id: 'push', label: t('settings.notificationPreferences.push'), description: t('settings.notificationPreferences.pushDesc') },
                    { id: 'rehearsals', label: t('settings.notificationPreferences.rehearsals'), description: t('settings.notificationPreferences.rehearsalsDesc') },
                    { id: 'services', label: t('settings.notificationPreferences.services'), description: t('settings.notificationPreferences.servicesDesc') },
                    { id: 'announcements', label: t('settings.notificationPreferences.announcements'), description: t('settings.notificationPreferences.announcementsDesc') },
                    { id: 'prayers', label: t('settings.notificationPreferences.prayers'), description: t('settings.notificationPreferences.prayersDesc') },
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('settings.securityInfo.title')}</CardTitle>
                  <CardDescription>{t('settings.securityInfo.desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t('settings.securityInfo.current')}</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t('settings.securityInfo.new')}</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('settings.securityInfo.confirm')}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="bg-brand-gold-500 hover:bg-brand-gold-400 text-brand-blue-900">
                    {t('settings.securityInfo.update')}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('settings.securityInfo.mfa')}</CardTitle>
                  <CardDescription>{t('settings.securityInfo.mfaDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t('settings.securityInfo.mfa')}</p>
                      <p className="text-sm text-muted-foreground">{t('settings.securityInfo.mfaDesc')}</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing */}
          {activeSection === 'billing' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('settings.billingInfo.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">Premium Plan</h3>
                        <Badge className="bg-brand-gold-500">{t('settings.billingInfo.active')}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        $49/month • {t('settings.billingInfo.renew', { date: 'Jan 15, 2025' })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">{t('settings.billingInfo.changePlan')}</Button>
                      <Button variant="destructive">{t('settings.billingInfo.cancel')}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('settings.billingInfo.payment')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded bg-muted flex items-center justify-center text-xs font-medium">
                        VISA
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">{t('settings.billingInfo.expires')} 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">{t('settings.billingInfo.update')}</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('settings.appearanceInfo.title')}</CardTitle>
                <CardDescription>{t('settings.appearanceInfo.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>{t('settings.appearanceInfo.theme')}</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: t('settings.appearanceInfo.light') },
                      { id: 'dark', label: t('settings.appearanceInfo.dark') },
                      { id: 'system', label: t('settings.appearanceInfo.system') },
                    ].map((themeOpt) => (
                      <button
                        key={themeOpt.id}
                        className={`p-4 rounded-lg border-2 transition-colors text-center ${
                          themeOpt.id === 'light' ? 'border-brand-gold-500 bg-brand-gold-500/5' : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-lg mb-2 mx-auto ${
                          themeOpt.id === 'light' ? 'bg-white border' :
                          themeOpt.id === 'dark' ? 'bg-brand-blue-500' : 'bg-gradient-to-r from-white to-brand-blue-500'
                        }`} />
                        <p className="text-sm font-medium">{themeOpt.label}</p>
                        {themeOpt.id === 'light' && (
                          <Check className="h-4 w-4 text-brand-gold-500 mx-auto mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>{t('settings.appearanceInfo.language')}</Label>
                  <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
