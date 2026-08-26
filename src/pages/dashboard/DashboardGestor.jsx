import Layout from "../../components/layout/Layout";
import HeroBanner from "../../components/dashboard/HeroBanner";
import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/dashboard/SectionCard";
import { IconPackage, IconChevron, IconLeaf, IconBox } from "../../components/Icons";

import useDashboardGestor from "./hooks/useDashboardGestor";
import { GESTOR_TABS } from "./data/dashboardData";

const DashboardGestor = () => {
  const { user, navigate, activeTab, setActiveTab, pendingItems, toValidateItems, loading, error, handleMarkAsBaled } = useDashboardGestor();

  if (!user) return null;

  return (
    <Layout>
      <div className="pt-20 pb-10 px-5 min-h-screen bg-gray-50">
        <div className="max-w-[980px] mx-auto">
          <HeroBanner 
            title="Panel de Gestión de Materiales" 
            subtitle="Gestiona el procesamiento y validación de materiales reciclables." 
            impactLabel="Materiales pendientes" 
            impactScore={pendingItems.length} 
          />

          {/* Mismas tarjetas StatCard alineadas con la estética principal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <StatCard 
              label="Pendientes" 
              value={pendingItems.length} 
              sub="Materiales por procesar" 
              accentColor="border-[#f59e0b]" 
              iconBg="bg-[#fef3c7]" 
              iconColor="text-[#d97706]" 
              icon={<IconPackage />} 
            />
            <StatCard 
              label="Fardos" 
              value={toValidateItems.length} 
              sub="Pendientes de validación" 
              accentColor="border-[#a855f7]" 
              iconBg="bg-[#f3e8ff]" 
              iconColor="text-[#9333ea]" 
              icon={<IconBox />} 
            />
            <StatCard 
              label="Total" 
              value={pendingItems.length + toValidateItems.length} 
              sub="Materiales gestionados" 
              accentColor="border-[#10b981]" 
              iconBg="bg-[#d1fae5]" 
              iconColor="text-[#059669]" 
              icon={<IconLeaf />} 
            />
          </div>

          {error && <SectionCard className="text-red-500 font-medium mb-4">{error}</SectionCard>}

          {/* Filtros de pestañas */}
          <SectionCard className="mb-4">
            <div className="flex flex-wrap gap-2.5">
              {GESTOR_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl font-semibold text-xs border transition-colors cursor-pointer ${
                    activeTab === tab.id ? "border-emerald-600/30 text-emerald-600 bg-emerald-50" : "border-gray-200 text-gray-500 hover:bg-gray-100 bg-transparent"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Sección principal de listado */}
          {loading ? (
            <SectionCard><p className="text-sm text-gray-500 m-0">Cargando materiales...</p></SectionCard>
          ) : (
            <SectionCard
              title={activeTab === "pending" ? "Ítems Pendientes de Procesamiento" : "Fardos Pendientes de Validación"}
              actionLabel={<>Ver todos <IconChevron /></>}
              onAction={() => navigate(`/search?processingState=${activeTab === "pending" ? "sin_procesar" : "fardado"}`)}
            >
              {(activeTab === "pending" ? pendingItems : toValidateItems).length === 0 ? (
                <div className="text-center py-9 px-4 text-gray-500">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    {activeTab === "pending" ? <IconPackage /> : <IconBox />}
                  </div>
                  <p className="text-xs text-gray-500 m-0">No hay elementos pendientes.</p>
                </div>
              ) : (
                (activeTab === "pending" ? pendingItems : toValidateItems).map((item) => (
                  <div key={item._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100/70 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      {activeTab === "pending" ? <IconPackage /> : <IconBox />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate m-0">{item.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5 m-0">{activeTab === "pending" ? `Estado: ${item.processingState}` : item.category}</p>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded-xl border border-emerald-600/30 text-emerald-600 font-semibold text-xs hover:bg-emerald-50 transition-colors cursor-pointer bg-transparent"
                      onClick={() => activeTab === "pending" ? handleMarkAsBaled(item._id) : navigate(`/validate?itemId=${item._id}`)}
                    >
                      {activeTab === "pending" ? "Marcar Fardado" : "Validar"}
                    </button>
                  </div>
                ))
              )}
            </SectionCard>
          )}

          {/* Accesos directos usando la misma estática de SectionCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="cursor-pointer transition-transform hover:-translate-y-0.5" onClick={() => navigate("/agenda")}>
              <SectionCard title="Agenda de Recolección">
                <p className="text-xs text-gray-500 m-0">Crear y gestionar rutas optimizadas.</p>
              </SectionCard>
            </div>
            
            <div className="cursor-pointer transition-transform hover:-translate-y-0.5" onClick={() => navigate("/historial")}>
              <SectionCard title="Archivo Histórico">
                <p className="text-xs text-gray-500 m-0">Historial de validaciones y movimientos.</p>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardGestor;