import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LangProvider } from "./hooks/LangContext.jsx";
import { ThemeProvider } from "./hooks/themeprovider.jsx";
// import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import { PopupProvider } from "./hooks/popupContext.jsx";
import { SnackbarProvider } from "./hooks/SnackBar.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { MessagesSupportProvider } from "./hooks/UseChatWithAdmin.jsx";
import { FileProvider } from "./hooks/FileProvider.jsx";
import { SocketProvider } from "./hooks/SensorReadings.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <LangProvider>
        <SocketProvider>
          <AuthProvider>
            <SnackbarProvider>
              <PopupProvider>
                <ThemeProvider>
                  <MessagesSupportProvider>
                    <FileProvider>
                      <App />
                    </FileProvider>
                  </MessagesSupportProvider>
                </ThemeProvider>
              </PopupProvider>
            </SnackbarProvider>
          </AuthProvider>
        </SocketProvider>
      </LangProvider>
    </Router>
  </StrictMode>
);
