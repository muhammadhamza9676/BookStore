import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initial state for light mode
  const [theme, setTheme] = useState("light");

  // Toggle function to switch between light and dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light'
        ? "dark"
        : "light" 
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme
export const useTheme = () => useContext(ThemeContext);
