<<<<<<< sidebar
=======

>>>>>>> main
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing } from "../pages/Landing.jsx"
import { Login } from "../pages/Login.jsx"
import { Register } from "../pages/Register.jsx"
import { Dashboard } from "../pages/Dashboard.jsx"
import { Logout } from "../pages/Logout.jsx"
<<<<<<< sidebar
import { Sidebar } from "../components/Sidebar.jsx"
=======
import { About } from "../pages/About.jsx"


>>>>>>> main

export const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
<<<<<<< sidebar
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path=":id" element={<Sidebar />} />  to add the route after mergin */}
=======

          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
   
          <Route path="/dashboard/:id" element={<Dashboard />} />
>>>>>>> main
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </>
<<<<<<< sidebar
=======

>>>>>>> main
  )
}
