// Este archivo define el contexto de autenticación de la aplicación. Se utiliza para compartir información sobre el usuario 
// autenticado y las funciones relacionadas con la autenticación entre los componentes de la aplicación. 
// El contexto se crea utilizando la función createContext de React y se exporta para que pueda ser utilizado en otros archivos.

import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext;