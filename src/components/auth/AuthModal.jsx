import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import CircularIllustration from './CircularIllustration';
import AboutCirculappModal from './AboutCirculappModal';
import MailIcon from '../../pages/auth/icons/MailIcon';
import LockIcon from '../../pages/auth/icons/LockIcon';
import EyeIcon from '../../pages/auth/icons/EyeIcon';
import UserIcon from '../../pages/auth/icons/UserIcon';
import ArrowRightIcon from '../../pages/auth/icons/ArrowRightIcon';
import { XMarkIcon } from '@heroicons/react/24/outline';

const fieldClasses = `
  flex items-center gap-2.5
  rounded-xl
  border border-gray-300
  bg-gray-50/50
  px-3.5 py-2.5
  transition-all duration-200
  focus-within:border-emerald-600
  focus-within:bg-white
  focus-within:ring-3
  focus-within:ring-emerald-600/10
`;

const inputClasses = `
  min-w-0 flex-1
  border-none
  bg-transparent
  text-sm
  text-gray-800
  outline-none
  placeholder:text-gray-400
`;

const labelClasses = `
  mb-1 block
  text-[11px]
  font-bold
  uppercase
  tracking-[0.06em]
  text-gray-500
`;

export default function AuthModal() {
  const {
    user,
    authModalOpen,
    authModalTab,
    authModalPrompt,
    openAuthModal,
    closeAuthModal,
    continueAsGuest,
    login,
    register
  } = useContext(AuthContext);

  const [showAboutModal, setShowAboutModal] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (user || !authModalOpen) return null;

  const isLogin = authModalTab === 'login';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      closeAuthModal();
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      closeAuthModal();
    } catch (err) {
      setError(err.message || 'Error al registrar la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-fade-in">
        <div className="flex flex-col items-center w-full max-w-4xl my-auto">
          {/* Main Card */}
          <div className="relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-slide-up border border-gray-100">
            {/* Close Button on top-right */}
            <button
              type="button"
              onClick={continueAsGuest}
              className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-full transition-colors cursor-pointer"
              title="Cerrar y continuar como invitado"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Left Column (Circular Illustration) */}
            <div className="hidden md:block md:col-span-5 h-full">
              <CircularIllustration onOpenAbout={() => setShowAboutModal(true)} />
            </div>

            {/* Right Column (Auth Form) */}
            <div className="col-span-1 md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              {/* Logo Badge */}
              <div className="flex justify-center mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F6E56] to-[#16a085] text-white shadow-md shadow-emerald-700/20">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-5">
                <h2 className="text-2xl font-bold text-gray-900 m-0">
                  {isLogin ? 'Bienvenido' : 'Crear cuenta'}
                </h2>
                <p className="text-sm text-gray-500 m-0 mt-1">
                  {isLogin ? (
                    <>
                      Inicia sesión en <span className="font-bold text-[#0F6E56]">Circulapp</span>
                    </>
                  ) : (
                    <>
                      Únete a <span className="font-bold text-[#0F6E56]">Circulapp</span>
                    </>
                  )}
                </p>

                {/* Prompt context if opened from action */}
                {authModalPrompt && (
                  <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                    🔒 {authModalPrompt}
                  </div>
                )}
              </div>

              {/* Error Box */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <span className="font-bold">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3.5">
                  {/* Correo Electrónico */}
                  <div>
                    <label className={labelClasses}>Correo electrónico</label>
                    <div className={fieldClasses}>
                      <span className="text-gray-400"><MailIcon /></span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nombre@correo.com"
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className={labelClasses}>Contraseña</label>
                      <Link
                        to="/forgot-password"
                        onClick={closeAuthModal}
                        className="text-xs text-[#0F6E56] hover:underline font-medium"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className={fieldClasses}>
                      <span className="text-gray-400"><LockIcon /></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className={inputClasses}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-700 cursor-pointer p-0 bg-transparent border-none"
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Checkbox Recordar */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      id="modalRememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#0F6E56] focus:ring-[#0F6E56] cursor-pointer"
                    />
                    <label htmlFor="modalRememberMe" className="text-xs text-gray-600 cursor-pointer select-none font-medium">
                      Recordar mi correo y datos de acceso
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6E56] to-[#16a085] hover:opacity-95 active:scale-[0.98] py-3 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    {!isLoading && <ArrowRightIcon />}
                  </button>

                  {/* Toggle to Register */}
                  <div className="text-center pt-2 text-xs text-gray-500">
                    ¿No tenés cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => { setError(''); openAuthModal('register', authModalPrompt); }}
                      className="font-bold text-[#0F6E56] hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Registrate
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
                  {/* Nombre */}
                  <div>
                    <label className={labelClasses}>Nombre completo</label>
                    <div className={fieldClasses}>
                      <span className="text-gray-400"><UserIcon /></span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label className={labelClasses}>Correo electrónico</label>
                    <div className={fieldClasses}>
                      <span className="text-gray-400"><MailIcon /></span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nombre@correo.com"
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className={labelClasses}>Contraseña</label>
                    <div className={fieldClasses}>
                      <span className="text-gray-400"><LockIcon /></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className={inputClasses}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-700 cursor-pointer p-0 bg-transparent border-none"
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Confirmar Contraseña */}
                  <div>
                    <label className={labelClasses}>Confirmar contraseña</label>
                    <div className={fieldClasses}>
                      <span className="text-gray-400"><LockIcon /></span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className={inputClasses}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-700 cursor-pointer p-0 bg-transparent border-none"
                      >
                        <EyeIcon open={showConfirmPassword} />
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6E56] to-[#16a085] hover:opacity-95 active:scale-[0.98] py-3 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                    {!isLoading && <ArrowRightIcon />}
                  </button>

                  {/* Toggle to Login */}
                  <div className="text-center pt-2 text-xs text-gray-500">
                    ¿Ya tenés una cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => { setError(''); openAuthModal('login', authModalPrompt); }}
                      className="font-bold text-[#0F6E56] hover:underline cursor-pointer bg-transparent border-none p-0"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              )}

              {/* Mobile "Sobre Circulapp" link */}
              <div className="mt-4 md:hidden text-center">
                <button
                  type="button"
                  onClick={() => setShowAboutModal(true)}
                  className="text-xs text-[#0F6E56] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
                >
                  ℹ️ ¿De qué trata Circulapp?
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Button: Continuar como invitado -> */}
          <div className="mt-4">
            <button
              type="button"
              onClick={continueAsGuest}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1e463a]/90 hover:bg-[#1e463a] text-white text-sm font-semibold border border-white/30 backdrop-blur-md shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Continuar como invitado</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Informative Modal: ¿De qué trata Circulapp? */}
      <AboutCirculappModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </>
  );
}
