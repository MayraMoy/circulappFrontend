const ErrorToast = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-[var(--error)] text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-sm">{error}</span>

        <button
          onClick={onClose}
          className="ml-2 text-white hover:opacity-80 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ErrorToast;