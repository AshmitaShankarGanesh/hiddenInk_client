import { useTheme } from "../context/ThemeContext";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      {theme === "light" ? <BsMoonFill /> : <BsSunFill />}
    </button>
  );
};

export default ThemeToggle;
