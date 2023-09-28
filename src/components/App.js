import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import "../styles/App.css";
import Header from "./Header";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Show from "../pages/Show";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route Component={Layout} path="/" >
          <Route Component={Home} index/>
          <Route Component={Login} path="login"/>
          <Route Component={Register} path="register"/>
          <Route Component={Show} path="show"/>
          <Route Component={Wishlist} path="wishlist"/>
          <Route Component={Profile} path="profile"/>
        </Route>
      </Routes>

    </Router>
  )
}

export default App;
