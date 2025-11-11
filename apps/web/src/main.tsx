import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Providers } from "./components/providers";
import "./styles.css";
import { RootAppView } from "./views";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RootAppView />
    </Providers>
  </StrictMode>,
);
