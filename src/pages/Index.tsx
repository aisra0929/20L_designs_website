import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';
import LandingAnimation from '@/components/LandingAnimation';
import HomePage from '@/components/HomePage';
import ShopPage from '@/components/ShopPage';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  const handleLandingComplete = () => {
    setShowLanding(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'shop':
        return <ShopPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Landing Animation */}
        {showLanding && <LandingAnimation onComplete={handleLandingComplete} />}

        {/* Navigation */}
        {!showLanding && (
          <Navigation 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
          />
        )}

        {/* Page Content */}
        {!showLanding && renderCurrentPage()}
      </div>
    </ThemeProvider>
  );
};

export default Index;
