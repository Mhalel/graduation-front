import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LangProvider } from "./hooks/LangContext.jsx";
import { ThemeProvider } from "./hooks/themeprovider.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { PopupProvider } from "./hooks/popupContext.jsx";
import { SnackbarProvider } from "./hooks/SnackBar.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { MessagesSupportProvider } from "./hooks/UseChatWithAdmin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <LangProvider>
        <AuthProvider>
          <SnackbarProvider>
            <PopupProvider>
              <ThemeProvider>
                <HelmetProvider>
                  <MessagesSupportProvider>
                    <App />
                  </MessagesSupportProvider>
                </HelmetProvider>
              </ThemeProvider>
            </PopupProvider>
          </SnackbarProvider>
        </AuthProvider>
      </LangProvider>
    </Router>
  </StrictMode>
);
