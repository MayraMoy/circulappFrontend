// Este hook personalizado permite acceder al contexto de autenticación de la aplicación. 
// Utiliza el hook useContext de React para obtener el valor del contexto AuthContext, 
// que contiene información sobre el usuario autenticado y las funciones relacionadas con la autenticación. 
// Al llamar a este hook, se puede acceder fácilmente a los datos de autenticación en cualquier componente funcional de la aplicación.

import { useContext } from "react";
import AuthContext from "../AuthContext";

export default function useAuth() {
    return useContext(AuthContext);
}