import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Instagram, Send, Music2 } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-light mb-6 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
            Contact
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full" />
          <p className="text-xl text-muted-foreground mt-8 max-w-2xl mx-auto">
            Let's start a conversation about the future of fashion
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass p-8 md:p-12 rounded-3xl">
            <h2 className="text-3xl font-light mb-8 text-foreground">Send us a message</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  className="glass border-0 focus:ring-2 focus:ring-brand-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more..."
                  rows={6}
                  className="glass border-0 focus:ring-2 focus:ring-brand-primary/50 resize-none"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] text-white font-medium py-6">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-foreground">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">hello@israeldesigns.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">+251 929007423</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-light mb-6 text-foreground">Follow us</h3>
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
              <h3 className="text-2xl font-light mb-6 text-foreground">Office Hours</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
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