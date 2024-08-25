import React, { createContext, useState } from "react";

// Create a context with a default value
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // 'light' as the default value

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const [authLevel, setAuthLevel] = useState("Block");

  return (
    <Context.Provider value={{ theme, toggleTheme, authLevel, setAuthLevel }}>
      {children}
    </Context.Provider>
  );
};
