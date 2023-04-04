import React, { createContext, useState, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const colors = {
    primary: "#F94A29",
    secondary: "#FCE22A",
    white: "#fff",
    black: "#000",
  };

  const darkTheme = {
    colors: {
      ...colors,
      background: "#222",
      backgroundLight: "#777",
      text: "#fff",
      color: "#fff",
      placeholder: "#fff",
      buttonBackground: "#F94A29",
      buttonText: "#fff",
    },
  };

  const lightTheme = {
    colors: {
      ...colors,
      background: "#fff",
      backgroundLight: "#F2F2F2",
      text: "#222",
      color: "#222",
      placeholder: "#222",
      buttonBackground: "#F94A29",
      buttonText: "#fff",
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
