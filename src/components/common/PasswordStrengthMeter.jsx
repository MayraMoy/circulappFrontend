// frontend/src/components/common/PasswordStrengthMeter.jsx
import { useMemo } from 'react';

const getPasswordStrength = (password = '') => {
  if (!password) return { score: 0, label: '', color: 'bg-gray-200', text: '' };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return { score: 1, label: 'Débil', color: 'bg-rose-500', textColor: 'text-rose-600', width: 'w-1/4' };
  }
  if (score <= 3) {
    return { score: 2, label: 'Media', color: 'bg-amber-500', textColor: 'text-amber-600', width: 'w-2/4' };
  }
  if (score === 4) {
    return { score: 3, label: 'Fuerte', color: 'bg-emerald-500', textColor: 'text-emerald-600', width: 'w-3/4' };
  }
  return { score: 4, label: 'Muy segura', color: 'bg-emerald-600', textColor: 'text-emerald-700 font-bold', width: 'w-full' };
};

export default function PasswordStrengthMeter({ password = '' }) {
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  if (!password) return null;

  return (
    <div className="mt-1.5 flex flex-col gap-1" aria-live="polite">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-gray-500">Seguridad de la contraseña:</span>
        <span className={`font-semibold ${strength.textColor}`}>{strength.label}</span>
      </div>

      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              level <= strength.score ? strength.color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-[10px] text-gray-400 m-0 leading-tight">
        Usa 8+ caracteres con letras, números y símbolos para mayor protección.
      </p>
    </div>
  );
}
