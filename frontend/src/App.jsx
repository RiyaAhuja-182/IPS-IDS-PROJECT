import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CreateAccount from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TrafficMonitor from "./pages/TrafficMonitor";
import ThreatIntel from "./pages/ThreatIntelligence";
import SystemHealth from "./pages/SystemHealth";
import BlockedIPs from "./pages/BlockedIPs";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page First */}
        <Route path="/" element={<Login />} />
<<<<<<< HEAD
        <Route path="/Signup" element={<CreateAccount />} />
=======
        <Route path="/signup" element={<Signup />} />
>>>>>>> c02169f752ed4c6a78d28f76f9d19af9817ed372

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Other Pages */}
        <Route path="/traffic" element={<TrafficMonitor />} />
        <Route path="/threat" element={<ThreatIntel />} />
        <Route path="/health" element={<SystemHealth />} />
        <Route path="/blocked" element={<BlockedIPs />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;