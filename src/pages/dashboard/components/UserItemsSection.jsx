import { useNavigate } from "react-router-dom";
import SectionCard from "../../../components/dashboard/SectionCard";
import StateBadge from "../../../components/badges/StateBadge";
import { IconPackage, IconChevron, IconImagePlaceholder, IconPlus } from "../../../components/Icons";
import { CATEGORY_NAMES } from "../data/dashboardData";

const UserItemsSection = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <SectionCard
      title="Mis productos recientes"
      icon={IconPackage}
      actionLabel={<>Ver todos <IconChevron /></>}
      onAction={() => navigate("/profile")}
    >
      {items.length === 0 ? (
        <div className="text-center py-9 px-4 text-gray-500">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <IconImagePlaceholder />
          </div>
          <p className="text-xs text-gray-500 mb-3.5">No publicaste ningún material aún.</p>
          <button
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer border-0"
            onClick={() => navigate("/publish")}
          >
            Publicar tu primer material
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {items.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100/70 transition-colors cursor-pointer"
              onClick={() => navigate(`/items/${item._id}`)}
            >
              {item.images?.[0] ? (
                <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0 flex items-center justify-center">
                  <IconImagePlaceholder />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate m-0">{item.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 m-0">{CATEGORY_NAMES[item.category] || item.category}</p>
              </div>
              <StateBadge state={item.processingState} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          className="w-full py-2.5 rounded-xl border border-emerald-600/30 text-emerald-600 font-semibold text-xs hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-transparent"
          onClick={() => navigate("/publish")}
        >
          <IconPlus /> Publicar nuevo material
        </button>
      </div>
    </SectionCard>
  );
};

export default UserItemsSection;