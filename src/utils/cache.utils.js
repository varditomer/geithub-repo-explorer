// src/utils/cache.utils.js
// Check if localStorage is available
const isLocalStorageAvailable = () => {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        console.log('error:', e.message)
        return false;
    }
};

// Cache expiration time (in milliseconds) - 10 minutes
const CACHE_EXPIRATION = 10 * 60 * 1000;

export const getCachedData = (key) => {
    if (!isLocalStorageAvailable()) return null;

    try {
        const cachedItem = localStorage.getItem(key);
        if (!cachedItem) return null;

        const { data, timestamp } = JSON.parse(cachedItem);

        // Check if cache is expired
        if (Date.now() - timestamp > CACHE_EXPIRATION) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error getting cached data:', error);
        return null;
    }
};

export const setCachedData = (key, data) => {
    if (!isLocalStorageAvailable()) return;

    try {
        const cacheItem = {
            data,
            timestamp: Date.now()
        };

        localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
        console.error('Error setting cached data:', error);
    }
};
