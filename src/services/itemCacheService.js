// circulappFrontend/src/services/itemCacheService.js
import API from './Api';

/**
 * Servicio de caché en memoria para peticiones de ítems.
 * Evita llamadas redundantes a /api/items entre componentes (SearchItems, Agenda, Historial, Dashboards)
 * y deduplica peticiones concurrentes en vuelo.
 */
class ItemCacheService {
  constructor(ttlMs = 20000) { // 20 segundos de TTL por defecto
    this.cache = new Map();
    this.inFlightRequests = new Map();
    this.ttlMs = ttlMs;
  }

  getCacheKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map(k => `${k}=${params[k]}`)
      .join('&');
    return `${url}?${sortedParams}`;
  }

  async getItems(params = {}, forceRefresh = false) {
    const key = this.getCacheKey('/items', params);
    const now = Date.now();

    // Si está en caché y no ha expirado y no se fuerza actualización
    if (!forceRefresh && this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (now - cached.timestamp < this.ttlMs) {
        return cached.data;
      }
    }

    // Si ya hay una petición idéntica en curso, reutilizar la misma promesa
    if (this.inFlightRequests.has(key)) {
      return this.inFlightRequests.get(key);
    }

    const promise = (async () => {
      try {
        const res = await API.get('/items', { params });
        const data = res.data;
        this.cache.set(key, { data, timestamp: Date.now() });
        return data;
      } finally {
        this.inFlightRequests.delete(key);
      }
    })();

    this.inFlightRequests.set(key, promise);
    return promise;
  }

  invalidateCache() {
    this.cache.clear();
    this.inFlightRequests.clear();
  }
}

export const itemCacheService = new ItemCacheService();
export default itemCacheService;
