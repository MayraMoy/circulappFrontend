import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchItems from '../pages/items/SearchItems';
import itemService from '../services/itemService';
import AuthContext from '../contexts/AuthContext';
import NotificationContext from '../contexts/NotificationContext';

vi.mock('../services/itemService', () => ({
  default: {
    getItems: vi.fn()
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

function renderSearchItems() {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={mockAuthValue}>
        <NotificationContext.Provider value={mockNotificationValue}>
          <SearchItems />
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

describe('Componente SearchItems - Pruebas de Búsqueda, Filtros y Empty State (Frontend)', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Debe renderizar los filtros de búsqueda y categorías', async () => {
    itemService.getItems.mockResolvedValue([]);

    renderSearchItems();

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/botellas, cartón.../i)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /Buscar materiales/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Filtrar por categoría/i)).toBeInTheDocument();
  });

  it('Debe mostrar la lista de materiales cuando la API devuelve resultados', async () => {
    itemService.getItems.mockResolvedValue([
      {
        _id: 'item-1',
        title: 'Bidones PEAD Limpios',
        category: 'plastico',
        processingState: 'sin_procesar',
        ownerId: { name: 'Juan Reciclador' },
        images: ['https://example.com/foto1.jpg']
      },
      {
        _id: 'item-2',
        title: 'Cajas de Cartón Prensadas',
        category: 'papel',
        processingState: 'fardado',
        ownerId: { name: 'Cooperativa Punilla' },
        images: []
      }
    ]);

    renderSearchItems();

    await waitFor(() => {
      expect(screen.getByText('Bidones PEAD Limpios')).toBeInTheDocument();
      expect(screen.getByText('Cajas de Cartón Prensadas')).toBeInTheDocument();
    });

    expect(screen.getByText('Juan Reciclador')).toBeInTheDocument();
    expect(screen.getByText('Cooperativa Punilla')).toBeInTheDocument();
  });

  it('Debe mostrar el empty state "No se encontraron materiales" si no hay resultados', async () => {
    itemService.getItems.mockResolvedValue([]);

    renderSearchItems();

    await waitFor(() => {
      expect(screen.getByText('No se encontraron materiales')).toBeInTheDocument();
      expect(screen.getByText(/Ajustá los filtros o probá con otros términos/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Limpiar filtros/i })).toBeInTheDocument();
  });

  it('Debe filtrar al seleccionar una categoría específica', async () => {
    itemService.getItems.mockResolvedValue([]);

    renderSearchItems();

    await waitFor(() => {
      expect(screen.getByLabelText(/Filtrar por categoría/i)).toBeInTheDocument();
    });

    const selectCategory = screen.getByLabelText(/Filtrar por categoría/i);
    fireEvent.change(selectCategory, { target: { value: 'vidrio' } });

    expect(selectCategory.value).toBe('vidrio');
  });

});
