import { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ create context
const ThemeContext = createContext();

// 2️⃣ provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // optional: persist theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "dark" ? "dark" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 3️⃣ custom hook (recommended)
export const useTheme = () => useContext(ThemeContext);
