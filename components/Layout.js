import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from '../styles/global'
import { lightTheme, darkTheme } from '../styles/themes'
import DarkModeToggle from "react-dark-mode-toggle";

function Layout({ children }) {
    // Use the state to determine darkMode
    const [darkMode, setDarkMode] = useState()
    const [mounted, setMounted] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => false);

    useEffect(() => {
        const darkModeValue = localStorage.getItem('DARK_MODE')
        // localStorage returns a string, not a boolean
        setDarkMode(darkModeValue === 'true')
            // Set mounted to `true` only after setting the `darkMode` state
        setMounted(true)
      }, [])

    useEffect(() => {
        localStorage.setItem('DARK_MODE', darkMode)
        }, [darkMode]) // Run every time `darkMode` changes

        if (!mounted) return <div />

  return (
    // This will pass `theme` from `ThemeProvider` as a prop into `GlobalStyles`
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <div style={{display:"flex", justifyContent:"flex-end"}}>


        <DarkModeToggle
        style={{paddingRight:"50px"}}
      onChange={setDarkMode}
      checked={darkMode}
      size={100}
    />
              {darkMode ? '💡Light on!' : '🌙Lights off!'}
      </div>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default Layout