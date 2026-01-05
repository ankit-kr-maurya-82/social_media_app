// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import "./index.css"
import Explore from './pages/Explore';

function App() {
  return (
    <div className='main'>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="explore" element={<Explore />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App; // ✅ make sure it's default export
