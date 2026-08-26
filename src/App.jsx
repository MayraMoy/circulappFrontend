import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import PublishItem from "./pages/items/PublishItem";
import Profile from "./pages/usuario/Profile";
import SearchItems from "./pages/items/SearchItems";
import ValidateMaterial from "./pages/funcionalidades/ValidateMaterial";
import ItemDetail from "./pages/items/ItemDetail";
import Educational from "./pages/educacion/Educational";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import NotFound from "./pages/notFound/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchItems />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/educational" element={<Educational />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/publish" element={<PublishItem />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/validate" element={<ValidateMaterial />} />
                <Route path="/admin/users" element={<AdminUserManagement />} />
            </Route>

            {/* Ruta 404 para rutas inexistentes (P-020) */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;