// circulappFrontend/src/services/itemService.js
import API from './Api';
import itemCacheService from './itemCacheService';

/**
 * Servicio centralizado para todas las operaciones sobre ítems y materiales reciclables.
 * Integra de forma transparente la caché en memoria y la invalidación automática en mutaciones (P-038).
 */
export const itemService = {
  /**
   * Obtiene la lista de ítems con soporte de filtros y caché
   */
  async getItems(params = {}, forceRefresh = false) {
    const data = await itemCacheService.getItems(params, forceRefresh);
    return Array.isArray(data) ? data : data.items || [];
  },

  /**
   * Obtiene un ítem por su ID
   */
  async getItemById(id) {
    const res = await API.get(`/items/${id}`);
    return res.data;
  },

  /**
   * Crea un nuevo ítem (FormData)
   */
  async createItem(formData) {
    const res = await API.post('/items', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    itemCacheService.invalidateCache();
    return res.data;
  },

  /**
   * Actualiza un ítem existente
   */
  async updateItem(id, formData) {
    const res = await API.put(`/items/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    itemCacheService.invalidateCache();
    return res.data;
  },

  /**
   * Elimina un ítem por su ID
   */
  async deleteItem(id) {
    const res = await API.delete(`/items/${id}`);
    itemCacheService.invalidateCache();
    return res.data;
  },

  /**
   * Marca un ítem como fardado
   */
  async markAsBaled(id) {
    const res = await API.patch(`/items/${id}/bale`);
    itemCacheService.invalidateCache();
    return res.data;
  },

  /**
   * Valida y certifica un fardo
   */
  async validateFardo(id, validationData) {
    const res = await API.patch(`/items/${id}/validate`, validationData);
    itemCacheService.invalidateCache();
    return res.data;
  },

  /**
   * Exporta materiales en formato binario (Blob)
   */
  async exportMaterials() {
    const res = await API.get('/items/exportar', { responseType: 'blob' });
    return res.data;
  },

  /**
   * Invalida manualmente la caché de ítems
   */
  invalidateCache() {
    itemCacheService.invalidateCache();
  }
};

export default itemService;
