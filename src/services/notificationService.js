// frontend/src/services/notificationService.js
import API from './Api';

const notificationService = {
  /**
   * Obtener notificaciones del usuario con conteo de no leídas
   */
  async getNotifications(params = {}) {
    const res = await API.get('/notifications', { params });
    return res.data;
  },

  /**
   * Marcar una notificación individual como leída
   */
  async markAsRead(id) {
    const res = await API.patch(`/notifications/${id}/read`);
    return res.data;
  },

  /**
   * Marcar todas las notificaciones como leídas
   */
  async markAllAsRead() {
    const res = await API.patch('/notifications/mark-all-read');
    return res.data;
  },

  /**
   * Eliminar una notificación
   */
  async deleteNotification(id) {
    const res = await API.delete(`/notifications/${id}`);
    return res.data;
  },

  /**
   * Limpiar todas las notificaciones ya leídas
   */
  async clearReadNotifications() {
    const res = await API.delete('/notifications/clear-all');
    return res.data;
  }
};

export default notificationService;
