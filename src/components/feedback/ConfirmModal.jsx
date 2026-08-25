import React from 'react';

/**
 * Componente Modal de Confirmación Estilizado con el tema nativo de CirculApp.
 * Centrado absoluto perfecto en pantalla completa con overlay borroso.
 */
const ConfirmModal = ({
  isOpen,
  title = "Confirmar acción",
  message = "¿Estás seguro de realizar esta acción?",
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  type = "primary", // primary, danger, success
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const getHeaderBg = () => {
    switch (type) {
      case "danger": return "linear-gradient(135deg, #C0392B, #E74C3C)";
      case "success": return "linear-gradient(135deg, #1E8449, #27AE60)";
      default: return "linear-gradient(135deg, #0f4c38 0%, #117A65 40%, #16A085 100%)";
    }
  };

  const getConfirmBtnStyle = () => {
    switch (type) {
      case "danger": return { background: '#E74C3C', color: '#FFF' };
      case "success": return { background: '#16A085', color: '#FFF' };
      default: return { background: '#16A085', color: '#FFF' };
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onCancel}
    >
      <div 
        style={{
          maxWidth: '440px',
          width: '100%',
          borderRadius: '20px',
          background: '#FFFFFF',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.28)',
          overflow: 'hidden',
          animation: 'confirmScaleUp 0.18s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con Gradiente */}
        <div 
          style={{
            background: getHeaderBg(),
            padding: '16px 20px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i 
              className={`bi ${type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-patch-question-fill'}`} 
              style={{ fontSize: '18px' }}
            />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#FFFFFF' }}>{title}</h3>
          </div>

          <button 
            type="button" 
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '18px',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Mensaje */}
        <div style={{ padding: '24px 20px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#4B5563', lineHeight: '1.55' }}>
            {message}
          </p>
        </div>

        {/* Acciones */}
        <div 
          style={{
            padding: '14px 20px',
            background: '#F8FAFC',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px'
          }}
        >
          {cancelText && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                background: '#E2E8F0',
                color: '#334155',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={onConfirm}
            style={{
              ...getConfirmBtnStyle(),
              border: 'none',
              padding: '8px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              transition: 'opacity 0.15s'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes confirmScaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
