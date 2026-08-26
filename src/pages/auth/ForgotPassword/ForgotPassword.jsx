import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import API from '../../../services/Api';
import MailIcon from '../icons/MailIcon';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const res = await API.post('/auth/forgot-password', { email });
      setSuccessMsg(res.data.msg || 'Correo de recuperación enviado con éxito.');
      setEmail('');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Error al procesar la solicitud. Intenta nuevamente.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Recuperar Contraseña"
      subtitle="Ingresa tu correo para recibir un enlace de recuperación"
      error={error}
    >
      {successMsg ? (
        <div className="flex flex-col gap-5 text-center">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left text-sm text-emerald-800">
            <div className="flex items-center gap-2 font-semibold text-emerald-900 mb-1">
              <i className="ti ti-mail-check text-lg text-emerald-600" />
              ¡Correo enviado!
            </div>
            <p>{successMsg}</p>
          </div>

          <p className="text-xs text-text-secondary">
            ¿No recibiste el correo? Revisa tu carpeta de correo no deseado (Spam) o intenta nuevamente.
          </p>

          <Link
            to="/login"
            className="inline-flex justify-center items-center gap-2 rounded-xl bg-primary py-2.5 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Volver a Iniciar Sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.06em] text-text-secondary"
            >
              Correo electrónico
            </label>

            <div className="flex items-center gap-2.5 rounded-xl border border-gray-300 bg-background px-3.5 py-2.5 transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
              <span className="flex shrink-0 text-text-secondary">
                <MailIcon />
              </span>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@correo.com"
                autoComplete="email"
                required
                className="min-w-0 flex-1 border-none bg-transparent text-sm text-text-primary outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Enviando correo...
              </>
            ) : (
              'Enviar enlace de recuperación'
            )}
          </button>

          <div className="mt-3 text-center">
            <Link
              to="/login"
              className="text-xs font-medium text-text-secondary transition-colors hover:text-primary"
            >
              ← Volver a Iniciar Sesión
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
