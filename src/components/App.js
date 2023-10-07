import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import "../styles/App.css";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Show from "../pages/Show";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import Subscribe from "../pages/Subscribe";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/" >
          <Route element={<Home />} index/>
          <Route element={<Login />} path="/login"/>
          <Route element={<Register />} path="/register"/>
          <Route element={<Show />} path="show"/>
          <Route element={<Wishlist />} path="/wishlist"/>
          <Route element={<Profile />} path="/profile"/>
          <Route element={<Subscribe />} path="/subscribe"/>
        </Route>
      </Routes>

    </Router>
  )
}

export default App;
