// Theme toggle. It switches light and dark mode in localStorage.
import { Sun , Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Keep the root class and local storage in sync
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }   
    localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
    // Flip between the two saved theme values.
    setTheme(theme === "dark" ? "light" : "dark");
}

    return(
        /* Theme switcher control */
        <button onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-muted/50 transition-colors duration-200"
      aria-label="Toggle Theme">
              {theme === "dark" ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
        </button>
    );
}
