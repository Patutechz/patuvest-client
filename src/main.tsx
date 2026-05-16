import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext";
import { WalletContextProvider } from "./context/WalletContext";
import { InvestmentContextProvider } from "./context/InvestmentContext";

import "./assets/css/fontawesome/css/all.css";
import { ThemeProviderWrapper } from "./ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <AuthContextProvider>
        <WalletContextProvider>
          <InvestmentContextProvider>
            <App />
          </InvestmentContextProvider>
        </WalletContextProvider>
      </AuthContextProvider>
    </ThemeProviderWrapper>
  </StrictMode>,
);
