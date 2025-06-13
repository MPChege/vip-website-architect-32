
// Cache management utilities
export const clearCache = async () => {
  try {
    // Clear browser cache
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('Cache cleared successfully');
    }
    
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Force reload without cache
    window.location.reload();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

export const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Cache version for cache busting
export const CACHE_VERSION = 'v1.0.1';

// Add timestamp to URLs for cache busting
export const addCacheBuster = (url: string) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
};
