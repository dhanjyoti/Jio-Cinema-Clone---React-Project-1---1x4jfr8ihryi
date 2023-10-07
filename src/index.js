import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import '@splidejs/react-splide/css';
import { UserProvider } from "./Utils/useUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
