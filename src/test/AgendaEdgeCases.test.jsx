import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Agenda from '../pages/agenda/Agenda';
import itemService from '../services/itemService';
import AuthContext from '../contexts/AuthContext';
import NotificationContext from '../contexts/NotificationContext';

// Mock de itemService
vi.mock('../services/itemService', () => ({
  default: {
    getItems: vi.fn(),
  }
}));

const mockAuthValue = {
  user: { _id: 'u1', name: 'Usuario Prueba', role: 'user' },
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

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthValue}>
        <NotificationContext.Provider value={mockNotificationValue}>
          {ui}
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Componente Agenda - Pruebas de Casos Extremos y Resiliencia (Frontend)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('No debe fallar si el ofertante tiene teléfono null o ausente (TypeError Guard)', async () => {
    itemService.getItems.mockResolvedValue([
      {
        _id: '60c72b2f9b1d8b2bad000001',
        title: 'Lote de Cartón Corrugado Limpio',
        category: 'papel',
        address: 'Charbonnier Centro',
        ownerId: {
          name: 'Carlos Vecino',
          phone: null // Caso crítico que antes provocaba TypeError
        },
        createdAt: new Date().toISOString()
      },
      {
        _id: '60c72b2f9b1d8b2bad000002',
        title: 'Bidones PEAD de Aceite',
        category: 'plastico',
        address: 'Punto Verde Punilla',
        ownerId: {
          name: 'María Gestora'
          // phone indefinido
        },
        createdAt: new Date().toISOString()
      }
    ]);

    renderWithProviders(<Agenda />);

    await waitFor(() => {
      expect(screen.getByText('Lote de Cartón Corrugado Limpio')).toBeInTheDocument();
      expect(screen.getByText('Bidones PEAD de Aceite')).toBeInTheDocument();
    });

    const noPhoneElements = screen.getAllByText('Sin teléfono');
    expect(noPhoneElements.length).toBe(2);
  });

  it('Debe renderizar enlace de WhatsApp cuando el teléfono es válido', async () => {
    itemService.getItems.mockResolvedValue([
      {
        _id: '60c72b2f9b1d8b2bad000003',
        title: 'Botellas de Vidrio',
        category: 'vidrio',
        address: 'Ruta 38 km 85',
        ownerId: {
          name: 'Cooperativa Recicla',
          phone: '+54 9 3548 123456'
        },
        createdAt: new Date().toISOString()
      }
    ]);

    renderWithProviders(<Agenda />);

    await waitFor(() => {
      expect(screen.getByText('Botellas de Vidrio')).toBeInTheDocument();
    });

    const contactLink = screen.getByRole('link', { name: /Contactar/i });
    expect(contactLink).toHaveAttribute('href', 'https://wa.me/5493548123456');
  });

  it('Debe mostrar estado vacío sin errores cuando no hay elementos en la agenda', async () => {
    itemService.getItems.mockResolvedValue([]);

    renderWithProviders(<Agenda />);

    await waitFor(() => {
      expect(screen.getByText('No hay retiros registrados')).toBeInTheDocument();
    });
  });

});
