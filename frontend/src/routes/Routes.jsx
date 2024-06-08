import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from "../pages/Landing.jsx";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { Logout } from "../pages/Logout.jsx";
import { Admin } from "../pages/Admin.jsx";
import { About } from "../pages/About.jsx";
import { ProtectedRoute } from "../components/ProtectedRoutes.jsx";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} fallbackComponent={<Dashboard />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </Router>
  );
};