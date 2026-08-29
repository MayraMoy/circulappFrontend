import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotificationBell from '../components/layout/navbar/components/NotificationBell';
import NotificationContext from '../contexts/NotificationContext';

describe('Componente NotificationBell (Frontend)', () => {

  const mockContextValue = {
    notifications: [
      {
        _id: '1',
        title: 'Nuevo Material Cercano',
        message: 'Se ha publicado un lote de botellas PET',
        type: 'item_published_nearby',
        read: false,
        link: '/items/123',
        createdAt: new Date().toISOString()
      }
    ],
    unreadCount: 1,
    markAsRead: vi.fn(),
    markAllAsRead: vi.fn(),
    deleteNotification: vi.fn(),
    clearAll: vi.fn(),
    refreshNotifications: vi.fn()
  };

  it('Debe renderizar el botón de la campana y mostrar el badge con el conteo de no leídas', () => {
    render(
      <MemoryRouter>
        <NotificationContext.Provider value={mockContextValue}>
          <NotificationBell />
        </NotificationContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /notificaciones/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('Debe abrir el menú desplegable al hacer clic en la campana', () => {
    render(
      <MemoryRouter>
        <NotificationContext.Provider value={mockContextValue}>
          <NotificationBell />
        </NotificationContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /notificaciones/i });
    fireEvent.click(button);

    expect(screen.getByText('Notificaciones')).toBeInTheDocument();
    expect(screen.getByText('Nuevo Material Cercano')).toBeInTheDocument();
    expect(screen.getByText('Se ha publicado un lote de botellas PET')).toBeInTheDocument();
  });

  it('Debe mostrar estado vacío "Todo al día" cuando no hay notificaciones', () => {
    const emptyContextValue = {
      ...mockContextValue,
      notifications: [],
      unreadCount: 0
    };

    render(
      <MemoryRouter>
        <NotificationContext.Provider value={emptyContextValue}>
          <NotificationBell />
        </NotificationContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /notificaciones/i });
    fireEvent.click(button);

    expect(screen.getByText('Todo al día')).toBeInTheDocument();
    expect(screen.getByText(/Te avisaremos cuando haya novedades en tu comunidad/i)).toBeInTheDocument();
  });

});
