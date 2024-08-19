import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { ContextApi } from "./contextApi/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextApi>
    <App />
  </ContextApi>
);
