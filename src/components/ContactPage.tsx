import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Instagram, Send, Music2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-light mb-6 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            {t('contact.title')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
          <p className="text-xl text-muted-foreground mt-8 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl font-light mb-8 text-foreground">{t('contact.form.title')}</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    {t('contact.firstName')}
                  </label>
                  <Input
                    id="firstName"
                    placeholder={t('contact.firstName.placeholder')}
                    className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    {t('contact.lastName')}
                  </label>
                  <Input
                    id="lastName"
                    placeholder={t('contact.lastName.placeholder')}
                    className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t('contact.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('contact.email.placeholder')}
                  className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  {t('contact.subject')}
                </label>
                <Input
                  id="subject"
                  placeholder={t('contact.subject.placeholder')}
                  className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('contact.message.placeholder')}
                  rows={6}
                  className="glass border-0 focus:ring-2 focus:ring-brand-primary/50 resize-none"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] text-white font-medium py-6">
                {t('contact.send')}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-foreground">{t('contact.info.title')}</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t('contact.info.email')}</p>
                    <p className="text-muted-foreground">hello@israeldesigns.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t('contact.info.phone')}</p>
                    <p className="text-muted-foreground">+251 929007423</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t('contact.info.location')}</p>
                    <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-foreground">{t('contact.follow')}</h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow text-muted-foreground hover:text-pink-500" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow text-muted-foreground hover:text-blue-500" aria-label="Telegram">
                  <Send className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow text-muted-foreground hover:text-black" aria-label="TikTok">
                  <Music2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Office Hours */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-foreground">{t('contact.hours')}</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>{t('contact.hours.monfri')}</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.hours.sat')}</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('contact.hours.sun')}</span>
                  <span>{t('contact.hours.closed')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;