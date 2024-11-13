import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">Dark Mode</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleToggleTheme}
            className="sr-only"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 bg-white rounded-full transition-transform`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SettingsPage;
