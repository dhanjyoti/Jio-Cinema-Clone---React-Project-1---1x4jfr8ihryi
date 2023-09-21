import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "../styles/App.css";
import Header from "./Header";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route Component={Layout} path="/" >
          <Route Component={Home} index/>
          <Route Component={Login} path="login"/>
          <Route Component={Register} path="register"/>
        </Route>
      </Routes>

    </Router>
  )
}

export default App;
