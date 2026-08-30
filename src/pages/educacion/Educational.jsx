import Layout from '../../components/layout/Layout';
import { SYSTEMS_DATA } from './data/educationalData';

const Educational = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6">
        <div className="max-w-[1360px] mx-auto">
          
          {/* Banner Superior Principal */}
          <div className="relative bg-gradient-to-r from-[#0f4c38] via-[#117a65] to-[#16a085] rounded-3xl p-8 mb-8 text-white overflow-hidden shadow-sm">
            
            {/* Decoraciones de fondo */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-20 -top-10 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block bg-white/18 border border-white/30 text-white px-3.5 py-1 rounded-full text-[11px] font-semibold mb-2.5 tracking-wider">
                Guía de Economía Circular
              </span>

              <h1 className="text-3xl font-extrabold text-white mb-1.5 tracking-tight">
                Sistemas de Tratamiento Orgánico
              </h1>

              <p className="text-sm text-emerald-100/90 max-w-2xl m-0">
                Conoce las distintas alternativas para transformar residuos orgánicos en compost y recursos energéticos.
              </p>
            </div>
          </div>

          {/* Grilla Responsiva de Tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 items-stretch">
            {SYSTEMS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Cabecera Verde de la Tarjeta */}
                <div className="bg-gradient-to-br from-[#0f4c38] via-[#117a65] to-[#16a085] p-5 text-white relative">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                      {item.tag}
                    </span>

                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                      <item.Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h2 className="text-xl font-extrabold text-white m-0">
                    {item.title}
                  </h2>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-5 flex-1 flex flex-col gap-3.5">
                  
                  {/* Badge "Ideal..." */}
                  <div className="bg-emerald-50 text-[#117a65] rounded-xl py-1.5 px-3 text-[11px] font-bold text-center">
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
      </div>
    </Layout>
  );
};

export default Educational;