import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.scss";
import "./index.scss";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
