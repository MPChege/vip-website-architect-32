
import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Monitor performance metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        });
      });

      observer.observe({ entryTypes: ['measure', 'navigation'] });

      return () => observer.disconnect();
    }
  }, []);

  const measurePerformance = (name: string, fn: () => void) => {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${name}-start`);
      fn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    } else {
      fn();
    }
  };

  return { measurePerformance };
};
