import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrengthMeter from '../components/common/PasswordStrengthMeter';

describe('Componente PasswordStrengthMeter (Frontend)', () => {

  it('No debe renderizar nada si la contraseña está vacía', () => {
    const { container } = render(<PasswordStrengthMeter password="" />);
    expect(container.firstChild).toBeNull();
  });

  it('Debe indicar "Débil" para contraseñas cortas o simples', () => {
    render(<PasswordStrengthMeter password="123" />);
    expect(screen.getByText(/Seguridad de la contraseña:/i)).toBeInTheDocument();
    expect(screen.getByText('Débil')).toBeInTheDocument();
  });

  it('Debe indicar "Media" para contraseñas de longitud regular con números', () => {
    render(<PasswordStrengthMeter password="clave123" />);
    expect(screen.getByText('Media')).toBeInTheDocument();
  });

  it('Debe indicar "Fuerte" o "Muy segura" para contraseñas complejas de 8+ caracteres con mayúsculas, números y símbolos', () => {
    render(<PasswordStrengthMeter password="CirculApp2026!Eco" />);
    expect(screen.getByText(/Muy segura|Fuerte/i)).toBeInTheDocument();
  });

  it('Debe contener atributo aria-live para accesibilidad con lectores de pantalla', () => {
    const { container } = render(<PasswordStrengthMeter password="password1" />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

});
