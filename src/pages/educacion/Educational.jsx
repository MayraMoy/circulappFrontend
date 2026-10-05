import Layout from '../../components/layout/Layout';
import {
  SYSTEMS_DATA,
  COMPOSTABLE_CATEGORIES,
  AVOID_ITEMS
} from './data/educationalData';

const Educational = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-[1360px] mx-auto space-y-10">
          
          {/* Banner Superior Principal */}
          <div className="relative bg-gradient-to-r from-[#0f4c38] via-[#117a65] to-[#16a085] rounded-3xl p-8 text-white overflow-hidden shadow-sm">
            
            {/* Decoraciones de fondo */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-20 -top-10 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block bg-white/18 border border-white/30 text-white px-3.5 py-1 rounded-full text-[11px] font-semibold mb-2.5 tracking-wider">
                Guía de Economía Circular
              </span>

              <h1 className="text-3xl font-extrabold text-white mb-1.5 tracking-tight">
                Sistemas de Tratamiento Orgánico y Guía de Compostaje
              </h1>

              <p className="text-sm text-emerald-100/90 max-w-2xl m-0 leading-relaxed">
                Conoce las distintas alternativas para transformar residuos orgánicos en compost fértil, y descubre cómo separar adecuadamente tus materiales en origen.
              </p>
            </div>
          </div>

          {/* Sección 1: Grilla Responsiva de Tarjetas con Logos PNG */}
          <div>
            <div className="mb-5">
              <span className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                Tecnologías Comunitarias
              </span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight m-0">
                Sistemas de Tratamiento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {SYSTEMS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
                >
                  {/* Encabezado con Logo PNG centrado estilo minimalista */}
                  <div className="bg-white pt-6 pb-4 px-4 flex items-center justify-center border-b border-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Cabecera Verde de la Tarjeta */}
                  <div className="bg-[#1e7e34] px-5 py-4 text-white text-center">
                    <span className="inline-block bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide mb-1.5">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white m-0 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Cuerpo de la Tarjeta con etiquetas y detalles */}
                  <div className="p-5 flex-1 flex flex-col gap-3.5 bg-white">
                    
                    {/* Badge "Ideal..." */}
                    <div className="bg-emerald-50 text-[#117a65] border border-emerald-100/80 rounded-xl py-1.5 px-3 text-[11px] font-bold text-center">
                      {item.ideal}
                    </div>

                    {/* Estructura */}
                    <div>
                      <strong className="block text-[11px] font-bold text-gray-800 mb-0.5 uppercase tracking-wider">
                        Estructura:
                      </strong>
                      <p className="text-xs text-gray-600 m-0 leading-relaxed">
                        {item.estructura}
                      </p>
                    </div>

                    {/* Funcionamiento */}
                    <div>
                      <strong className="block text-[11px] font-bold text-gray-800 mb-0.5 uppercase tracking-wider">
                        Funcionamiento:
                      </strong>
                      <p className="text-xs text-gray-600 m-0 leading-relaxed">
                        {item.funcionamiento}
                      </p>
                    </div>

                    {/* Producto final */}
                    <div>
                      <strong className="block text-[11px] font-bold text-gray-800 mb-0.5 uppercase tracking-wider">
                        Producto final:
                      </strong>
                      <p className="text-xs text-gray-600 m-0 leading-relaxed">
                        {item.producto}
                      </p>
                    </div>

                    {/* Ventajas principales */}
                    <div>
                      <strong className="block text-[11px] font-bold text-gray-800 mb-0.5 uppercase tracking-wider">
                        Ventajas principales:
                      </strong>
                      <p className="text-xs text-gray-600 m-0 leading-relaxed">
                        {item.ventajas}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección 2: Guía de Separación en Origen (Infografía oficial) */}
          <div className="pt-4">
            <div className="mb-6">
              <span className="text-[11px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                Guía Práctica Vecinal
              </span>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight m-0">
                Separación de Residuos Orgánicos
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
                Asegura un proceso de compostaje óptimo respetando las recomendaciones de materiales aptos y aquellos que deben evitarse en todos los casos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Tarjeta Verde: Materiales Orgánicos Compostables */}
              <div className="lg:col-span-8 bg-[#2c8f3b] text-white rounded-3xl overflow-hidden shadow-sm flex flex-col border border-emerald-700">
                {/* Banner de Cabecera Amarillo */}
                <div className="bg-[#faca25] py-3.5 px-6 text-center border-b border-amber-400">
                  <h3 className="text-base sm:text-lg font-black text-gray-950 uppercase tracking-wider m-0">
                    Materiales Orgánicos Compostables
                  </h3>
                </div>

                {/* Grilla de 3 Columnas de Materiales */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                  {COMPOSTABLE_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="flex flex-col bg-black/10 rounded-2xl p-4 border border-white/10">
                      <div className="mb-3">
                        <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5">
                          {cat.tag}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-snug m-0">
                          {cat.title}
                        </h4>
                      </div>
                      <ul className="space-y-2.5 text-xs text-emerald-50 leading-relaxed m-0 p-0 list-none flex-1">
                        {cat.items.map((it, idx) => (
                          <li key={idx} className="flex items-start gap-2 bg-white/10 rounded-xl p-2.5">
                            <span className="text-[#faca25] font-black shrink-0 mt-0.5">•</span>
                            <span className="font-medium">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarjeta Blanca / Roja: Evitar en Todos los Casos */}
              <div className="lg:col-span-4 bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col border-2 border-[#e30615]">
                {/* Banner de Cabecera Rojo */}
                <div className="bg-[#e30615] py-3.5 px-6 text-center border-b border-red-700">
                  <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider m-0">
                    Evitar en Todos los Casos
                  </h3>
                </div>

                {/* Listado de Materiales No Permitidos */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <ul className="space-y-3 m-0 p-0 list-none">
                    {AVOID_ITEMS.map((item, idx) => (
                      <li key={idx} className="bg-red-50/70 border border-red-100 rounded-xl p-3 flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                          <span className="text-[#e30615] font-black shrink-0 text-base leading-none">•</span>
                          <span className="text-xs font-bold text-gray-900 leading-snug">
                            {item.text}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-red-700 bg-red-100/80 rounded-md px-2 py-0.5 self-start ml-4 border border-red-200">
                          {item.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Educational;