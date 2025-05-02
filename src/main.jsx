import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LangProvider } from "./hooks/LangContext.jsx";
import { ThemeProvider } from "./hooks/themeprovider.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { PopupProvider } from "./hooks/popupContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <PopupProvider>
        <ThemeProvider>
          <LangProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </LangProvider>
        </ThemeProvider>
      </PopupProvider>
    </Router>
  </StrictMode>
);
