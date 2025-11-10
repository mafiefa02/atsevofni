import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { Providers } from "./components/providers";
import "./styles.css";
import { IndexView } from "./views";
import { IndexLoading } from "./views/index-loading";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Suspense fallback={<IndexLoading />}>
        <IndexView />
      </Suspense>
    </Providers>
  </StrictMode>,
);
