
import HeroSection from '../components/HeroSection';
import PortfolioGallery from '../components/PortfolioGallery';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import PerformanceOptimizer from '../components/PerformanceOptimizer';

const Index = () => {
  return (
    <div className="pt-20">
      <PerformanceOptimizer />
      <HeroSection />
      <div id="portfolio">
        <PortfolioGallery isHomepage={true} />
      </div>
      <WhyChooseUsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
