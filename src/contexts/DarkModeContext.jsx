import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "./../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
  function toggleMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );
  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        toggleMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkMode context was used outside the dark mode provider");
  return context;
}
export { DarkModeProvider, useDarkMode };
