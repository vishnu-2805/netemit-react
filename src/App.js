import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth, logOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Measure from './pages/Measure';
import Habit from './pages/Habit';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import SignIn from './pages/SignIn';

export default function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // Firebase watches login state automatically
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  // Show nothing while Firebase checks login state
  if (checking) {
    return (
      <div style={{minHeight:'100vh',background:'#07070a',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:'#00ff87'}}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <SignIn onLogin={() => {}} />;
  }

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={logOut} />
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