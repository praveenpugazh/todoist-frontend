import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './components/page/Home.jsx'
import Register from './components/page/Register'
import Login from './components/page/Login'
import { UserProvider } from './context/UserContext'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
)

