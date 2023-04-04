import React, { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const colors = {
    primary: "#F94A29",
    white: "#fff",
    black: "#000",
  };

  const darkTheme = {
    colors: {
      ...colors,
      background: "#222",
      text: "#fff",
    },
  };

  const lightTheme = {
    colors: {
      ...colors,
      background: "#fff",
      text: "#222",
    },
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const ctxValue = {
    theme,
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
