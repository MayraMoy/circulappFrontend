import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px'
      }}>
        <div style={{
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: 'var(--color-background-primary, #ffffff)',
          borderRadius: '20px',
          border: '1px solid var(--color-border-tertiary, #E5E7EB)',
          padding: '48px 32px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}>
          {/* Badge 404 */}
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '30px',
            backgroundColor: '#E1F5EE',
            color: '#0F6E56',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            Error 404
          </div>

          {/* Icono temático circular */}
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            backgroundColor: '#F0FDF4',
            border: '2px dashed #0F6E56',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <i
              className="ti ti-recycle-off"
              style={{ fontSize: '40px', color: '#0F6E56' }}
              aria-hidden="true"
            />
          </div>

          <h1 style={{
            fontSize: '26px',
            fontWeight: '700',
            color: 'var(--color-text-primary, #111827)',
            margin: '0 0 12px',
            lineHeight: '1.3'
          }}>
            Página no encontrada
          </h1>

          <p style={{
            fontSize: '15px',
            color: 'var(--color-text-secondary, #6B7280)',
            lineHeight: '1.6',
            margin: '0 auto 32px',
            maxWidth: '420px'
          }}>
            La ruta o recurso que estás buscando no existe, ha sido movido o fue reciclado en otra ubicación.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/search')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: '#0F6E56',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.15s, transform 0.1s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#085041'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0F6E56'}
            >
              <i className="ti ti-search" style={{ fontSize: '16px' }} aria-hidden="true" />
              Explorar catálogo
            </button>

            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: 'transparent',
                color: 'var(--color-text-primary, #374151)',
                border: '1px solid var(--color-border-secondary, #D1D5DB)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-background-secondary, #F3F4F6)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <i className="ti ti-arrow-left" style={{ fontSize: '16px' }} aria-hidden="true" />
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
