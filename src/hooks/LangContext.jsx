import { useState, useContext, createContext, useCallback, useMemo } from "react";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const getInitialLang = () => localStorage.getItem("lang") || "en";

  const [lang, setLang] = useState(getInitialLang);

  const updateLang = useCallback((newLang) => {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
  }, []);

  const contextValue = useMemo(() => ({ lang, setLang: updateLang }), [lang, updateLang]);

  return <LangContext.Provider value={contextValue}>{children}</LangContext.Provider>;
};

// Custom Hook for accessing language context
export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
};

// Optimized Translation Component
export const T = ( ar, en ) => {
  const { lang } = useLang();
  return <>{lang === "ar" ? ar : en}</>;
};
