import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "./index.css";
import App from "./App.tsx";

// Initialize Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// CRITICAL FIX: Use the BASE_URL provided by Vite. 
// This variable automatically contains the path defined in your vite.config.ts: 
// '/' for local dev, and '/YOUR_REPO_NAME/' for the production build.
const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      {/* The basename prop tells react-router-dom what prefix to use for all routes. */}
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>
);
