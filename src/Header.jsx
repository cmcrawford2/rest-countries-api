import { useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const root = document.querySelector(":root");
    const style = root.style;

    if (newTheme === "light") {
      style.setProperty("--element-background-color", "hsl(0, 0%, 100%)");
      style.setProperty("--primary-background-color", "hsl(0, 0%, 98%)");
      style.setProperty("--text-color", "hsl(200, 15%, 8%)");
    } else {
      style.setProperty("--element-background-color", "hsl(209, 23%, 22%)");
      style.setProperty("--primary-background-color", "hsl(207, 26%, 17%)");
      style.setProperty("--text-color", "hsl(0, 0%, 100%)");
    }
  }

  return (
    <header>
      <nav>
        <h2>Where in the world?</h2>
        <div>
          <i
            className={theme === "light" ? "far fa-moon" : "far fa-sun"}
            onClick={toggleTheme}
          ></i>
          {theme === "light" ? <p>Dark Mode</p> : <p>Light Mode</p>}
        </div>
      </nav>
    </header>
  );
}
