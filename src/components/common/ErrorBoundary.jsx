import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('💥 Error capturado por ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/search';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F8F9FA',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '520px',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '40px 32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            textAlign: 'center',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 20px'
            }}>
              ⚠️
            </div>

            <h1 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#111827',
              margin: '0 0 10px'
            }}>
              ¡Ups! Algo salió mal
            </h1>

            <p style={{
              fontSize: '14px',
              color: '#6B7280',
              lineHeight: '1.5',
              margin: '0 0 24px'
            }}>
              Ocurrió un error inesperado al renderizar esta sección. No te preocupes, tus datos no se han perdido.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                textAlign: 'left',
                backgroundColor: '#F3F4F6',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '12px',
                color: '#374151',
                overflowX: 'auto'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '8px' }}>
                  Detalles del error técnico
                </summary>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#ffffff',
                  backgroundColor: '#0F6E56',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                Recargar página
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  backgroundColor: '#F3F4F6',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
