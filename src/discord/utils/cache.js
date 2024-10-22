const cache = new Map();

export const setCache = (key, value, ttl) => {
  cache.set(key, { value, expiresAt: Date.now() + ttl });
};

export const getCache = (key) => {
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }
  cache.delete(key); // Remove se expirado
  return null;
};

export const clearCache = () => {
  cache.clear();
};
