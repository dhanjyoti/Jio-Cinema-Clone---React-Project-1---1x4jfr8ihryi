import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import "@splidejs/react-splide/css";
import { UserProvider } from "./Utils/useUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
        <App />
        <ToastContainer/>
    </UserProvider>
  </React.StrictMode>
);
