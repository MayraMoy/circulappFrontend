// Este archivo contiene una función para inicializar la autenticación del usuario al cargar la aplicación.
// Intenta restaurar la sesión del usuario desde el almacenamiento local y actualizar el estado de autenticación en el contexto.

import { getStoredSession } from "../services/sessionService";

export default async function initializeAuth(
    setUser,
    setLoading,
    logout
) {
    try {
        const { token, user } = getStoredSession();

        if (!token || !user) {
            return;
        }

        const parsedUser = JSON.parse(user);

        // Más adelante
        // const { data } = await API.get(`/users/${parsedUser.id}`);
        // setUser(data);

        setUser(parsedUser);
    } catch (error) {
        console.error("Error al restaurar sesión:", error);
        logout();
    } finally {
        setLoading(false);
    }
}