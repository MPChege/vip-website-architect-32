
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, RefreshCw } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { preloadImages, clearCache } from '../utils/cacheUtils';
import { usePerformance } from '../hooks/usePerformance';

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showCacheClear, setShowCacheClear] = useState(false);
  const { measurePerformance } = usePerformance();

  const heroTexts = useMemo(() => [
    "New Standard of Sophistication",
    "Pinnacle of Excellence", 
    "Legacy of Distinction"
  ], []);

  // Optimized hero photos collection - prioritize first few images
  const heroPhotos = useMemo(() => [
    "/lovable-uploads/2329957a-d7b8-4f7d-972b-f79e1a8b71c1.png",
    "/lovable-uploads/f71bd9cd-c4c9-4a59-a24d-a6e49d984afe.png",
    "/lovable-uploads/b497ba4d-222d-4316-97e0-44f8c7702e39.png",
    "/lovable-uploads/2259eca1-3ecc-488d-815f-6fd0e5318d30.png",
    "/lovable-uploads/c7198820-b469-4c13-ba3e-a7c42300fc77.png",
    "/lovable-uploads/529a494b-d0dd-4063-871f-cc8d450b1874.png",
    "/lovable-uploads/8d99ee18-e14c-4acd-8975-2f03e81cc1f0.png",
    "/lovable-uploads/fe39ac21-24c0-4edd-9bff-f4253732d3a8.png",
    "/lovable-uploads/1a67ea66-46e9-460f-bc7d-e7c9c7bb1d52.png",
    "/lovable-uploads/4c3b614e-7c5f-45b7-81b7-2f2cdd08e7ad.png",
    "/lovable-uploads/5d8c0a64-fcfc-4dfa-b275-f4c06abdc1ca.png",
    "/lovable-uploads/69f2eb95-52a8-4b00-8482-3996df94b114.png",
    "/lovable-uploads/a4fe64fe-a291-4afd-a0ce-0c85442bd3b8.png",
    "/lovable-uploads/6c7a207d-bb6c-460a-8b97-47aaedc82ece.png",
    "/lovable-uploads/adb82355-1802-4cf7-a5dd-17f512f3c8aa.png",
    "/lovable-uploads/97e67e72-f29f-481a-8f83-299b395d8072.png",
    "/lovable-uploads/9e748710-7fa9-4148-bce9-cccefca96666.png",
    "/lovable-uploads/028f216e-ee0a-4bab-8d16-1a8fc8afdd5d.png"
  ], []);

  const scrollToPortfolio = () => {
    measurePerformance('scroll-to-portfolio', () => {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const handleClearCache = () => {
    measurePerformance('clear-cache', () => {
      clearCache();
    });
  };

  // Preload critical images on component mount
  useEffect(() => {
    // Preload first 3 images for immediate display
    preloadImages(heroPhotos.slice(0, 3));
    
    // Show cache clear option after 5 seconds
    const timer = setTimeout(() => setShowCacheClear(true), 5000);
    return () => clearTimeout(timer);
  }, [heroPhotos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroTexts.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => {
        const newIndex = (prev + 1) % heroPhotos.length;
        // Preload next image
        if (newIndex + 1 < heroPhotos.length) {
          preloadImages([heroPhotos[newIndex + 1]]);
        }
        return newIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [heroPhotos]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-luxury overflow-hidden">
      {/* Cache Clear Button */}
      {showCacheClear && (
        <button
          onClick={handleClearCache}
          className="fixed top-24 right-4 z-50 bg-luxury-gold/90 text-luxury-black p-2 rounded-full hover:bg-luxury-gold transition-all duration-300 shadow-lg"
          title="Clear Cache & Refresh"
        >
          <RefreshCw size={16} />
        </button>
      )}

      {/* Optimized Sliding Photo Background */}
      <div className="absolute inset-0 z-0">
        {heroPhotos.map((photo, index) => (
          <div
            key={photo}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentPhotoIndex 
                ? 'opacity-50 sm:opacity-40 scale-105' 
                : 'opacity-0 scale-100'
            }`}
          >
            <OptimizedImage
              src={photo}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full"
              loading={index < 3 ? 'eager' : 'lazy'}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-luxury-black/40 sm:bg-luxury-black/50 z-1"></div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10 z-2">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNENEFGMzciIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] repeat"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-playfair font-bold text-luxury-white mb-4 sm:mb-6 leading-tight px-2">
            <span className="block mb-2 sm:mb-4">The Power for Your Event</span>
            <span className="text-gradient-gold block mt-2 transition-all duration-1000 ease-in-out transform text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {heroTexts[currentTextIndex]}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-luxury-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300 px-4">
            Where luxury meets logistics. Experience flawless VIP service that transforms every occasion into an unforgettable moment of excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center mb-8 sm:mb-12 animate-fade-in delay-500 px-4">
            <Link to="/book-meeting" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto group bg-luxury-gold hover:bg-luxury-gold-dark text-luxury-black font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-luxury-gold/40 relative overflow-hidden">
                <span className="relative z-10">Book VIP Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={scrollToPortfolio}
              className="w-full sm:w-auto border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Discover Excellence
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12 animate-fade-in delay-700 px-4">
            <div className="flex items-center justify-center space-x-2 text-luxury-white/80">
              <div className="w-2 h-2 bg-luxury-gold rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium">5+ Years Excellence</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-luxury-white/80">
              <div className="w-2 h-2 bg-luxury-gold rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium">24/7 Premium Support</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-luxury-white/80">
              <div className="w-2 h-2 bg-luxury-gold rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium">500+ VIP Events</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button 
              onClick={scrollToPortfolio}
              className="inline-flex flex-col items-center text-luxury-white/70 hover:text-luxury-gold transition-all duration-300 group"
            >
              <span className="text-xs sm:text-sm font-medium mb-2 group-hover:scale-110 transition-transform">Discover Excellence</span>
              <div className="relative">
                <ChevronDown size={20} className="sm:w-6 sm:h-6 animate-pulse" />
                <div className="absolute inset-0 bg-luxury-gold/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 border-2 border-luxury-gold/30 rounded-full animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-32 right-10 w-24 h-24 border-2 border-luxury-gold/40 rounded-full animate-pulse delay-1000"></div>
      <div className="hidden md:block absolute top-1/2 left-4 w-16 h-16 border border-luxury-gold/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="hidden lg:block absolute bottom-1/4 right-1/4 w-8 h-8 bg-luxury-gold/20 rounded-full animate-ping delay-2000"></div>
      
      {/* Mobile decorative elements */}
      <div className="sm:hidden absolute top-24 right-4 w-16 h-16 border border-luxury-gold/20 rounded-full animate-pulse"></div>
      <div className="sm:hidden absolute bottom-24 left-4 w-12 h-12 border border-luxury-gold/30 rounded-full animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;
