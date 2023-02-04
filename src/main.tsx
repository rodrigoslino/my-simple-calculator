import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./Context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
