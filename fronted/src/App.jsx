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
import CreatePost from './pages/CreatePost';
import Chat from './pages/Chat';

function App() {
  return (
    <div className='main'>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile/:username" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="explore" element={<Explore />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App; // ✅ make sure it's default export
