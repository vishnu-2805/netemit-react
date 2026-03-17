import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Measure from './pages/Measure';
import Habit from './pages/Habit';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import SignIn from './pages/SignIn';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <SignIn onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <NavBar onLogout={() => setIsAuthenticated(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/measure" element={<Measure />} />
        <Route path="/habit" element={<Habit />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}