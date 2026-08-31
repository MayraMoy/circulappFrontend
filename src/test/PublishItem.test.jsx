import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PublishItem from '../pages/items/PublishItem';
import AuthContext from '../contexts/AuthContext';
import NotificationContext from '../contexts/NotificationContext';
import API from '../services/Api';
import itemService from '../services/itemService';

// Mock de API y servicios
vi.mock('../services/Api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn()
  }
}));

vi.mock('../services/itemService', () => ({
  default: {
    createItem: vi.fn()
  }
}));

const mockAuthValue = {
  user: { _id: 'u1', name: 'Usuario Prueba', email: 'test@example.com', phone: '+5493548000000', role: 'user' },
  updateUser: vi.fn(),
  logout: vi.fn(),
  openAuthModal: vi.fn()
};

const mockNotificationValue = {
  notifications: [],
  unreadCount: 0,
  markAsRead: vi.fn(),
  markAllAsRead: vi.fn(),
  deleteNotification: vi.fn(),
  clearAll: vi.fn(),
  refreshNotifications: vi.fn()
};

function renderPublishItem(authOverride = {}) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={{ ...mockAuthValue, ...authOverride }}>
        <NotificationContext.Provider value={mockNotificationValue}>
          <PublishItem />
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Componente PublishItem - Pruebas de Formulario y Validación (Frontend)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Debe renderizar los campos principales del formulario de publicación', () => {
    renderPublishItem();

    expect(screen.getByRole('heading', { name: /Publicar material/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: Botellas PET limpias, 20 kg/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contá más detalles: cantidad/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: Av. Rivadavia 1234, Buenos Aires/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Publicar material/i })).toBeInTheDocument();
  });

  it('Debe permitir seleccionar distintas categorías de material', () => {
    renderPublishItem();

    const plasticoBtn = screen.getByRole('button', { name: /Plástico/i });
    const vidrioBtn = screen.getByRole('button', { name: /Vidrio/i });

    expect(plasticoBtn).toHaveClass('active');

    fireEvent.click(vidrioBtn);
    expect(vidrioBtn).toHaveClass('active');
    expect(plasticoBtn).not.toHaveClass('active');
  });

  it('Debe mostrar error si se intenta enviar sin seleccionar o buscar una ubicación válida', async () => {
    renderPublishItem();

    const titleInput = screen.getByPlaceholderText(/Ej: Botellas PET limpias, 20 kg/i);
    fireEvent.change(titleInput, { target: { name: 'title', value: 'Lote de Cartón' } });

    const submitBtn = screen.getByRole('button', { name: /Publicar material/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Debes validar la ubicación técnica mediante el botón "Buscar Mapa" o "GPS"/i)).toBeInTheDocument();
    });
  });

  it('Debe mostrar chip de ubicación con la dirección formateada tras geocodificación exitosa', async () => {
    API.get.mockResolvedValueOnce({
      data: {
        lat: -30.7782,
        lng: -64.5522,
        formattedAddress: 'Charbonier, Córdoba, Argentina'
      }
    });

    renderPublishItem();

    const addressInput = screen.getByPlaceholderText(/Ej: Av. Rivadavia 1234, Buenos Aires/i);
    fireEvent.change(addressInput, { target: { value: 'Charbonier' } });

    const buscarBtn = screen.getByRole('button', { name: /Buscar Mapa/i });
    fireEvent.click(buscarBtn);

    await waitFor(() => {
      expect(screen.getByText(/Charbonier, Córdoba, Argentina/i)).toBeInTheDocument();
    });
  });

  it('Debe deshabilitar el botón de submit mientras se procesa la publicación', async () => {
    itemService.createItem.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 500)));

    API.get.mockResolvedValueOnce({
      data: {
        lat: -31.4201,
        lng: -64.1888,
        formattedAddress: 'Córdoba Capital'
      }
    });

    renderPublishItem();

    const titleInput = screen.getByPlaceholderText(/Ej: Botellas PET limpias, 20 kg/i);
    fireEvent.change(titleInput, { target: { name: 'title', value: 'Tapitas Plásticas' } });

    const addressInput = screen.getByPlaceholderText(/Ej: Av. Rivadavia 1234, Buenos Aires/i);
    fireEvent.change(addressInput, { target: { value: 'Córdoba Capital' } });

    const buscarBtn = screen.getByRole('button', { name: /Buscar Mapa/i });
    fireEvent.click(buscarBtn);

    await waitFor(() => {
      expect(screen.getByText(/Córdoba Capital/i)).toBeInTheDocument();
    });

    const submitBtn = screen.getByRole('button', { name: /Publicar material/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });

});
