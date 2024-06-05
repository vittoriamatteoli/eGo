import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from "../pages/Landing.jsx"
import { Login } from "../pages/Login.jsx"
import { Register } from "../pages/Register.jsx"
import { Dashboard } from "../pages/Dashboard.jsx"
import { Logout } from "../pages/Logout.jsx"


import { EnergyCard } from "../components/EnergyCard.jsx"

import { Sidebar } from "../components/Sidebar.jsx"

import { About } from "../pages/About.jsx"


export const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

         
          <Route path=":id" element={<EnergyCard />} />
          

          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path=":id" element={<Sidebar />} /> 

          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
  )
}
