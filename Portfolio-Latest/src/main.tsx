import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App.tsx";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// 👇 Dynamically set the base depending on dev or production
const basename =
  import.meta.env.MODE === "development" ? "/" : "/Portfolio";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>
);


