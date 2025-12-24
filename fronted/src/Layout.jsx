import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'
import Login from './pages/Login'
import { ThemeProvider } from './context/theme'
import Register from './pages/Register'

const Layout = () => {
  const [themeMode, setThemeMode] = useState("light")
  
  const lightTheme = () => {
    setThemeMode("light")
  }
  
  const darkTheme = () => {
    setThemeMode("dark")
  }

  // actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <div>
      <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
        <UserContextProvider>
        <Header/>
        {/* <Login/> */}
        {/* <Register/> */}
        <Outlet/>
        {/* <Footer/> */}
      </UserContextProvider>
      </ThemeProvider>
    </div>
  )
}

export default Layout
