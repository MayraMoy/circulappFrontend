// frontend/src/components/RateUserModal.jsx
import { useState } from 'react';
import API from '../../services/Api';

const RateUserModal = ({ itemId, ownerName, onClose }) => {
  const [formData, setFormData] = useState({
    materialQuality: 3,
    punctuality: '',
    standardCompliance: '',
    comment: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemId) {
      setError('ID del ítem no válido.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await API.post('/ratings', {
        itemId,
        materialQuality: parseInt(formData.materialQuality),
        punctuality: formData.punctuality ? parseInt(formData.punctuality) : undefined,
        standardCompliance: formData.standardCompliance ? parseInt(formData.standardCompliance) : undefined,
        comment: formData.comment
      });
      
      alert('¡Gracias por tu calificación!');
      onClose(); // Cerrar el modal
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al enviar la calificación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Calificar a {ownerName}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Calidad del material */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Calidad del material donado *
          </label>
          <select
            name="materialQuality"
            value={formData.materialQuality}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
              </option>
            ))}
          </select>
        </div>

        {/* Puntualidad */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Puntualidad en la entrega/recolección
          </label>
          <select
            name="punctuality"
            value={formData.punctuality}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">No calificar</option>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
              </option>
            ))}
          </select>
        </div>

        {/* Cumplimiento de estándares */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Cumplimiento de estándares de procesamiento
          </label>
          <select
            name="standardCompliance"
            value={formData.standardCompliance}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">No calificar</option>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
              </option>
            ))}
          </select>
        </div>

        {/* Comentario */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Comentario (opcional)
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
            maxLength="500"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Enviando...' : 'Enviar Calificación'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RateUserModal;