import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/auth/Login/Login';
import AuthContext from '../contexts/AuthContext';

const mockLoginFn = vi.fn();

const mockAuthValue = {
  user: null,
  login: mockLoginFn,
  logout: vi.fn(),
  openAuthModal: vi.fn()
};

function renderLogin(authOverride = {}) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ ...mockAuthValue, ...authOverride }}>
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Componente Login - Pruebas de Autenticación y Formulario (Frontend)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('Debe renderizar los inputs de correo, contraseña, checkbox y botón de submit', () => {
    renderLogin();

    expect(screen.getByPlaceholderText('nombre@correo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByLabelText(/Recordar mi correo y datos de acceso/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/¿Olvidaste tu contraseña\?/i)).toBeInTheDocument();
  });

  it('Debe alternar la visibilidad de la contraseña al hacer clic en el botón de ojo', () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText('••••••••');
    const toggleBtn = screen.getByLabelText(/Mostrar contraseña/i);

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    const hideBtn = screen.getByLabelText(/Ocultar contraseña/i);
    fireEvent.click(hideBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('Debe llamar a la función de login con los datos ingresados al enviar el formulario', async () => {
    mockLoginFn.mockResolvedValueOnce({ user: { id: '1', name: 'Pedro' } });

    renderLogin();

    const emailInput = screen.getByPlaceholderText('nombre@correo.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'pedro@circulapp.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockLoginFn).toHaveBeenCalledWith('pedro@circulapp.com', 'Password123!');
    });
  });

  it('Debe mostrar mensaje de error en pantalla cuando el login falla', async () => {
    mockLoginFn.mockRejectedValueOnce(new Error('Credenciales inválidas'));

    renderLogin();

    const emailInput = screen.getByPlaceholderText('nombre@correo.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'error@circulapp.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });

});
