import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Prevent transitions on initial load
document.documentElement.classList.add('prevent-transition');

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove transition prevention after initial render
setTimeout(() => {
  document.documentElement.classList.remove('prevent-transition');
}, 100);
