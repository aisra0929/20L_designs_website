import { Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  // Listen for custom event from HomePage to navigate to Shop
  useEffect(() => {
    const handler = () => onPageChange('shop');
    window.addEventListener('navigateToShop', handler as EventListener);
    return () => window.removeEventListener('navigateToShop', handler as EventListener);
  }, [onPageChange]);

  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="glass px-4 md:px-6 py-3 flex items-center gap-4">
        {/* Hamburger on small screens, inline links on md+ */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/30"
            aria-label="Toggle Menu"
            onClick={() => setOpen(v => !v)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onPageChange(link.id)}
                className={`
                  relative px-3 py-2 text-sm font-medium transition-all duration-300
                  hover:text-brand-primary hover:scale-105
                  ${currentPage === link.id ? 'text-brand-primary' : 'text-foreground/80'}
                `}
              >
                {link.name}
                {currentPage === link.id && (
                  <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Theme toggle (always visible) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative hover:bg-brand-primary/10 hover:scale-110 transition-all duration-300"
        >
          <div className="relative w-5 h-5">
            <Sun
              className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
                theme === 'light' 
                  ? 'rotate-0 scale-100 opacity-100' 
                  : 'rotate-90 scale-0 opacity-0'
              }`}
            />
            <Moon
              className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
                theme === 'dark' 
                  ? 'rotate-0 scale-100 opacity-100' 
                  : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </div>
        </Button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mt-2 md:hidden glass px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onPageChange(link.id); setOpen(false); }}
              className={`
                text-left px-2 py-2 rounded-md transition-colors
                ${currentPage === link.id ? 'text-brand-primary' : 'text-foreground'}
                hover:bg-muted/30
              `}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;