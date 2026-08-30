import welcomeBannerImg from '../../assets/circulapp-welcome.png';

export default function CircularIllustration({ onOpenAbout }) {
  return (
    <div className="relative flex flex-col items-center justify-between h-full min-h-[480px] p-6 bg-[#507E74] text-white rounded-l-3xl max-md:rounded-t-3xl max-md:rounded-b-none select-none overflow-hidden">
      {/* Top spacer */}
      <div className="w-full" />

      {/* Graphic Illustration */}
      <div className="relative z-10 w-full max-w-[280px] my-auto flex items-center justify-center">
        <img
          src={welcomeBannerImg}
          alt="Economía Circular Circulapp"
          className="w-full h-auto max-h-[310px] object-contain pointer-events-none"
        />
      </div>

      {/* Interactive button at the bottom */}
      <div className="relative z-20 w-full pb-2 flex justify-center">
        <button
          type="button"
          onClick={onOpenAbout}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#194b3c] hover:bg-gray-100 active:scale-95 text-xs font-bold shadow-lg transition-all cursor-pointer"
        >
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#194b3c] text-white text-[10px]">
            i
          </span>
          ¿De qué trata Circulapp?
        </button>
      </div>
    </div>
  );
}
