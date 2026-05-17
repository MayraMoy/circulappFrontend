import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import PublishItem from "./pages/items/PublishItem";
import Profile from "./pages/usuario/Profile";
import SearchItems from "./pages/items/SearchItems";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/publish" element={<PublishItem />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<SearchItems />} />
    </Routes>
  );
}

export default App;