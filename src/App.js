import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();
  const hideHeaderOn = ["/login", "/signup", "/dashboard"];
  const showHeader = !hideHeaderOn.includes(location.pathname);

  return (
    <>
    {showHeader && <Header/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  )
}
function App() {
  return (
    <Router>
      <AppContent/>
    </Router>
  )
}
export default App;