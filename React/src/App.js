import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./Shared/Auths/Login";
import Register from "./Shared/Auths/Register";
import Profiles from "./Shared/Auths/Profiles";
import AdminDashboard from './AdminComponents/Components';
import AssistantDashboard from './AssistantComponents/Components';
import LandingPage from './LandingComponents/Components';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes({ setRole }) {
  const [currentRole, setCurrentRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const rl = localStorage.getItem("role");
    setCurrentRole(rl);
  }, []);

  useEffect(() => {
    if (currentRole) {
      setRole(currentRole);
    }
  }, [currentRole, setRole]);

  const renderDashboard = () => {
    if (currentRole === "admin") return <Route path='/*' element={<AdminDashboard />} />;
    if (currentRole === "assistant") return <Route path='/*' element={<AssistantDashboard />} />;
    return <Route path='/*' element={<LandingPage />} />;
  };

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/login' element={<Login setRole={setRole} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profiles setRole={setRole} />} />
        {renderDashboard()}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [role, setRole] = useState(null);

  return (
    <BrowserRouter>
      <AnimatedRoutes setRole={setRole} />
    </BrowserRouter>
  );
}

export default App;