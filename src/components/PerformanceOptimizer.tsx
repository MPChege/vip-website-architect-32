
import { useEffect } from 'react';
import { preloadImages } from '../utils/cacheUtils';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical images for portfolio section
    const criticalImages = [
      "/lovable-uploads/128c46de-f529-4c6d-9c43-0e87592a70ba.png",
      "/lovable-uploads/2329957a-d7b8-4f7d-972b-f79e1a8b71c1.png",
      "/lovable-uploads/f71bd9cd-c4c9-4a59-a24d-a6e49d984afe.png"
    ];
    
    // Delay preloading to not interfere with initial render
    const timer = setTimeout(() => {
      preloadImages(criticalImages);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;
