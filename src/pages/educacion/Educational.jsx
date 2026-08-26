import React from 'react';
import Layout from '../../components/layout/Layout';
import '../dashboard/Dashboard.css';

const systems = [
  {
    id: 'cajon',
    tag: 'Sistema Modular Apilable',
    title: 'Compostera Cajón',
    icon: 'bi-box-seam',
    ideal: 'Ideal: Patios, balcones y terrazas',
    estructura: 'Módulos o cajones apilables fabricados en madera tratada o plástico reciclado.',
    funcionamiento: 'Se colocan residuos orgánicos por niveles mezclando restos húmedos y material seco aeróbico.',
    producto: 'Compost sólido maduro, de aroma a tierra húmeda y alto poder fertilizante.',
    ventajas: 'Diseño compacto, muy ordenado e ideal para espacios urbanos reducidos.'
  },
  {
    id: 'pozo',
    tag: 'Directo en la Tierra',
    title: 'Compostera de Pozo',
    icon: 'bi-grid-1x2',
    ideal: 'Ideal: Jardines amplios y terrenos',
    estructura: 'Fosa excavada en el suelo de 30 a 60 cm de profundidad con cubierta natural.',
    funcionamiento: 'Los restos se depositan directamente sobre la tierra cubriéndose con mantillo u hojas secas.',
    producto: 'Humus natural bio-integrado directamente en el sustrato del terreno.',
    ventajas: 'Cero costo de estructura, descomposición 100% natural e imperceptible.'
  },
  {
    id: 'lumbricario',
    tag: 'Lumbricario Biológico',
    title: 'Vermicompostera',
    icon: 'bi-bug',
    ideal: 'Ideal: Espacios de alta eficiencia',
    estructura: 'Contenedor multinivel con ventilación lateral y colector inferior de lixiviados.',
    funcionamiento: 'Lombrices rojas californianas digieren la materia orgánica acelerando la biotransformación.',
    producto: 'Humus sólido de alta concentración y fertilizante líquido (\'Té de lombriz\').',
    ventajas: 'Proceso súper rápido, sin malos olores y rico en microorganismos benéficos.'
  },
  {
    id: 'biodigestor',
    tag: 'Energía & Biogás',
    title: 'Biodigestor Urbano',
    icon: 'bi-lightning-charge-fill',
    ideal: 'Ideal: Hogares sostenibles y granjas',
    estructura: 'Tanque hermético con cámara de fermentación anaeróbica y válvulas de escape.',
    funcionamiento: 'Microorganismos metanogénicos descomponen los desechos orgánicos en ausencia de oxígeno.',
    producto: 'Biogás limpio para cocción/energía y biofertilizante líquido concentrado.',
    ventajas: 'Genera energía renovable limpia y elimina por completo las emisiones.'
  }
];

const Educational = () => {
  return (
    <Layout>
      <div className="dashboard-wrapper" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

          {/* Banner Superior Principal (Idéntico a imagen original) */}
          <div
            className="hero-banner"
            style={{
              padding: '2rem 2.5rem',
              borderRadius: '24px',
              marginBottom: '2rem'
            }}
          >
            <div className="hero-banner-deco" />
            <div className="hero-banner-deco-2" />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(255, 255, 255, 0.18)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  padding: '4px 14px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '600',
                  marginBottom: '10px',
                  letterSpacing: '0.04em'
                }}
              >
                Guía de Economía Circular
              </span>

              <h1 className="hero-title" style={{ fontSize: '30px', fontWeight: '800', marginBottom: '6px' }}>
                Sistemas de Tratamiento Orgánico
              </h1>

              <p className="hero-sub" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                Conoce las distintas alternativas para transformar residuos orgánicos en compost y recursos energéticos.
              </p>
            </div>
          </div>

          {/* Grilla 4 Columnas Exactas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
              alignItems: 'stretch'
            }}
          >
            {systems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #EAECEF',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  transition: 'transform 0.18s, box-shadow 0.18s'
                }}
              >
                {/* Cabecera Verde de la Tarjeta */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #0f4c38 0%, #117A65 40%, #16A085 100%)',
                    padding: '20px',
                    color: '#FFFFFF',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.18)',
                        color: '#FFFFFF',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}
                    >
                      {item.tag}
                    </span>

                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '15px'
                      }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                  </div>

                  <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: '0' }}>
                    {item.title}
                  </h2>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Badge Mint "Ideal..." */}
                  <div
                    style={{
                      background: '#E8F8F5',
                      color: '#117A65',
                      borderRadius: '10px',
                      padding: '7px 12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textAlign: 'center'
                    }}
                  >
                    {item.ideal}
                  </div>

                  {/* Estructura */}
                  <div>
                    <strong style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Estructura:
                    </strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                      {item.estructura}
                    </p>
                  </div>

                  {/* Funcionamiento */}
                  <div>
                    <strong style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Funcionamiento:
                    </strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                      {item.funcionamiento}
                    </p>
                  </div>

                  {/* Producto final */}
                  <div>
                    <strong style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Producto final:
                    </strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                      {item.producto}
                    </p>
                  </div>

                  {/* Ventajas principales */}
                  <div>
                    <strong style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                      Ventajas principales:
                    </strong>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.45' }}>
                      {item.ventajas}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Educational;