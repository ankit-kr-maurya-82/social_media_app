import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import About from './components/About/About.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Post from './pages/Post.jsx'



const router = createBrowserRouter([
   {
    path: "/",
    element: <Layout />,
    children: [

      // 🔓 Public routes
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // 🔐 Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          // { index: true, element: <Home /> },
          { path: "/", element: <Home /> },
          { path: "about", element: <About /> },
          { path: "profile", element: <Profile /> },
          { path: "post", element: <Post /> },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
