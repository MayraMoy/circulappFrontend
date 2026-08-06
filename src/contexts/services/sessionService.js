// Este archivo contiene funciones para manejar la sesión del usuario en la aplicación, incluyendo guardar, limpiar y 
// obtener la sesión almacenada en el almacenamiento local del navegador. 

export const saveSession = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};

export const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getStoredSession = () => {
    return {
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
    };
};

export const updateStoredUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};