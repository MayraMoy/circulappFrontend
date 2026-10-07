import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import instagramIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';

const legalDocuments = {
  terminos: {
    title: 'Términos y Condiciones de Uso',
    badge: 'Uso Comunitario',
    content: (
      <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
        <p>
          Bienvenido a <strong>ComunaRed</strong>, una plataforma comunitaria de economía circular diseñada para facilitar el intercambio, recuperación y aprovechamiento de materiales reciclables y reutilizables en el <strong>Valle de Punilla</strong>.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">1. Propósito Comunitario</h4>
        <p>
          ComunaRed es un servicio colaborativo sin fines de lucro cuyo objetivo principal es conectar a vecinos, recolectores urbanos, cooperativas y puntos verdes para reducir la generación de residuos sólidos urbanos y fomentar la sostenibilidad ambiental local.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">2. Uso Aceptable de la Plataforma</h4>
        <p>
          Los usuarios se comprometen a publicar únicamente materiales reciclables limpios, secos y debidamente clasificados. Queda estrictamente prohibida la publicación de residuos patogénicos, sustancias tóxicas, explosivas, residuos peligrosos o artículos ilegales.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">3. Moderación y Suspensión</h4>
        <p>
          Los gestores comunales y administradores se reservan el derecho de moderar, editar o dar de baja publicaciones que no cumplan con las normas de higiene, clasificación o respeto comunitario, así como suspender cuentas que incurran en prácticas fraudulentas o maliciosas.
        </p>
      </div>
    )
  },
  privacidad: {
    title: 'Política de Privacidad y Tratamiento de Datos',
    badge: 'Protección de Datos',
    content: (
      <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
        <p>
          En <strong>ComunaRed</strong> valoramos profundamente la privacidad de los vecinos de Punilla. Esta política describe cómo tratamos la información personal recopilada a través de la plataforma.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">1. Datos Recopilados</h4>
        <p>
          Recopilamos únicamente los datos estrictamente necesarios para la coordinación de retiro de materiales: nombre, correo electrónico, número de teléfono (opcional para contacto por WhatsApp) y ubicación aproximada o dirección del punto de acopio.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">2. Uso y Protección de la Información</h4>
        <p>
          Tus contraseñas se almacenan mediante encriptación unidireccional con algoritmo <strong>Bcrypt (12 rounds)</strong> y nunca en texto plano. Los datos personales nunca son comercializados, cedidos ni transferidos a empresas de publicidad de terceros.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">3. Derechos del Usuario</h4>
        <p>
          Podés solicitar la rectificación o eliminación definitiva de tu cuenta y datos de contacto en cualquier momento desde tu panel de perfil o contactando a la mesa de ayuda.
        </p>
      </div>
    )
  },
  exencion: {
    title: 'Exención de Responsabilidad Vecinal',
    badge: 'Aviso Importante',
    content: (
      <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
        <p>
          <strong>Aviso sobre transacciones y encuentros presenciales entre vecinos:</strong>
        </p>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium">
          ComunaRed actúa exclusivamente como un canal digital de vinculación y visibilización de materiales reciclables. No interviene en la logística física, transporte, pesaje ni en acuerdos económicos privados entre particulares.
        </div>
        <h4 className="font-bold text-gray-800 text-sm">1. Seguridad en los Encuentros</h4>
        <p>
          Recomendamos coordinar retiros de materiales durante horarios diurnos, preferentemente en lugares públicos iluminados o directamente en los Puntos Verdes oficiales de Punilla.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">2. Estado y Manipulación de Materiales</h4>
        <p>
          La verificación del estado, peso e higiene del material donado o transferido es responsabilidad mutua de las partes intervinientes al momento de la entrega. La plataforma y la Comuna quedan exentas de responsabilidad por desacuerdos o daños derivados de la manipulación de residuos.
        </p>
      </div>
    )
  },
  contacto: {
    title: 'Soporte y Contacto Técnico Comunal',
    badge: 'Mesa de Ayuda',
    content: (
      <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
        <p>
          ¿Tuviste algún inconveniente técnico, encontraste un error en la plataforma o necesitas asistencia con tu cuenta? Nuestro equipo de desarrollo y los administradores comunales están para ayudarte.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
            <span className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">Mesa Técnica Digital</span>
            <p className="font-semibold text-gray-900 text-xs m-0 min-h-[1.25rem]"></p>
            <span className="text-[10px] text-gray-500">Respuesta en 24 a 48 hs hábiles</span>
          </div>
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
            <span className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">Punto Verde Punilla</span>
            <p className="font-semibold text-gray-900 text-xs m-0">Ruta Nacional 38, Punilla, Córdoba</p>
            <span className="text-[10px] text-gray-500">Lunes a Viernes de 08:00 a 14:00 hs</span>
          </div>
        </div>
      </div>
    )
  },
  nosotros: {
    title: 'Sobre el Proyecto ComunaRed & Punilla',
    badge: 'Comunidad & Territorio',
    content: (
      <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
        <p>
          <strong>ComunaRed</strong> nace como una respuesta comunitaria a los desafíos de gestión de residuos en el norte del <strong>Valle de Punilla</strong>, uniendo tecnología accesible con la vocación ambiental de los vecinos y trabajadores del reciclaje de Punilla.
        </p>
        <h4 className="font-bold text-gray-800 text-sm">Nuestra Misión</h4>
        <p>
          Cerrar el ciclo de vida de los materiales plásticos, metales, papeles, cartones y vidrios generados en los hogares, evitando que terminen en basurales a cielo abierto o degraden las sierras cordobesas, reinsertándolos en la cadena productiva local.
        </p>
      </div>
    )
  }
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const currentYear = new Date().getFullYear();

  const openDoc = (docKey) => (e) => {
    e.preventDefault();
    setActiveModal(legalDocuments[docKey] || null);
  };

  return (
    <>
      <footer className="bg-[#F8FAF7] border-t border-[#E4EAE1] text-gray-700 pt-14 pb-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Cabecera Orgánica del Footer: Identidad Local */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-[#E4EAE1]">
            <div className="flex items-start sm:items-center gap-3.5">
              <BrandLogo variant="symbol" size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-900 tracking-tight">ComunaRed</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#C2EAD9]">
                    Punilla
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 font-medium">
                  Red comunitaria de economía circular y recuperación de recursos en Punilla.
                </p>
              </div>
            </div>

            {/* Badges de Compromiso Sostenible */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#0F6E56] border border-[#D5E6DC] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F6E56]" />
                Iniciativa Vecinal
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-[#D5E6DC] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Valle de Punilla · Córdoba
              </span>
            </div>
          </div>

          {/* Grilla Principal de 5 Columnas Organizadas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 text-xs">
            
            {/* Columna 1: Territorio y Comunidad */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                Comunidad
              </h3>
              <ul className="space-y-2.5 text-gray-600">
                <li>
                  <button onClick={openDoc('nosotros')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Sobre nosotros
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('nosotros')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Valle de Punilla
                  </button>
                </li>
                <li>
                  <Link to="/search" className="hover:text-[#0F6E56] transition-colors">
                    Puntos Verdes y Acopio
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-[#0F6E56] transition-colors">
                    Red de Recolectores
                  </Link>
                </li>
                <li>
                  <Link to="/agenda" className="hover:text-[#0F6E56] transition-colors">
                    Agenda de Retiro Comunal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 2: Plataforma & Gestión */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                Plataforma
              </h3>
              <ul className="space-y-2.5 text-gray-600">
                <li>
                  <Link to="/search" className="hover:text-[#0F6E56] transition-colors">
                    Explorar Materiales
                  </Link>
                </li>
                <li>
                  <Link to="/publish" className="hover:text-[#0F6E56] transition-colors font-medium text-[#0F6E56]">
                    + Publicar Material
                  </Link>
                </li>
                <li>
                  <Link to="/validate" className="hover:text-[#0F6E56] transition-colors">
                    Certificación de Fardos
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-[#0F6E56] transition-colors">
                    Panel de Gestión
                  </Link>
                </li>
                <li>
                  <Link to="/historial" className="hover:text-[#0F6E56] transition-colors">
                    Archivo Histórico
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Educación & Separación */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                Educación
              </h3>
              <ul className="space-y-2.5 text-gray-600">
                <li>
                  <Link to="/educational" className="hover:text-[#0F6E56] transition-colors">
                    Guía de Separación en Origen
                  </Link>
                </li>
                <li>
                  <Link to="/search?category=plastico" className="hover:text-[#0F6E56] transition-colors">
                    Clasificación de Plásticos
                  </Link>
                </li>
                <li>
                  <Link to="/search?category=papel" className="hover:text-[#0F6E56] transition-colors">
                    Papel, Cartón y Celulosa
                  </Link>
                </li>
                <li>
                  <Link to="/search?category=vidrio" className="hover:text-[#0F6E56] transition-colors">
                    Vidrio y Metales Limpios
                  </Link>
                </li>
                <li>
                  <Link to="/educational" className="hover:text-[#0F6E56] transition-colors">
                    Buenas Prácticas Ambientales
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: Soporte & Transparencia */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                Soporte
              </h3>
              <ul className="space-y-2.5 text-gray-600">
                <li>
                  <button onClick={openDoc('contacto')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Mesa de Ayuda Técnica
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('contacto')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Reportar Error en la Web
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('contacto')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Consultas a Administradores
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('contacto')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Buzón de Sugerencias
                  </button>
                </li>
                <li>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Servidores 100% Operativos
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna 5: Marco Legal & Seguridad */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                Marco Legal
              </h3>
              <ul className="space-y-2.5 text-gray-600">
                <li>
                  <button onClick={openDoc('terminos')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Términos y Condiciones
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('privacidad')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('exencion')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit font-medium text-amber-800">
                    Exención de Responsabilidad
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('terminos')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Código de Convivencia Vecinal
                  </button>
                </li>
                <li>
                  <button onClick={openDoc('privacidad')} className="hover:text-[#0F6E56] transition-colors text-left cursor-pointer bg-transparent border-0 p-0 text-inherit">
                    Tratamiento de Datos
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Barra Inferior / Subfooter */}
          <div className="pt-8 mt-4 border-t border-[#E4EAE1] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 font-medium">
            <p className="m-0 text-center sm:text-left">
              © {currentYear} <strong>ComunaRed</strong> · Plataforma de Economía Circular. Desarrollado para el <strong>Valle de Punilla</strong>, Córdoba.
            </p>

            {/* Redes Sociales Comunitarias */}
            <div className="flex items-center gap-4 text-gray-600">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Comunitario"
                className="hover:scale-110 transition-transform p-1 inline-flex items-center justify-center"
              >
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5 rounded-md object-contain shadow-xs" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Comunitario"
                className="hover:scale-110 transition-transform p-1 inline-flex items-center justify-center"
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5 rounded-full object-contain shadow-xs" />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Modal Orgánico de Visualización de Documentos Legales y Soporte */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#C2EAD9]">
                  {activeModal.badge}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1.5 m-0">
                  {activeModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Cerrar modal"
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer border-0 bg-transparent"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div>
              {activeModal.content}
            </div>

            <div className="pt-5 mt-6 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-[#0F6E56] hover:bg-[#085041] text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
