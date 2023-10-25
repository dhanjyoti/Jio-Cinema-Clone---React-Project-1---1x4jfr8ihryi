import { BrowserRouter as Router, Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import "../styles/App.css";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Show from "../pages/Show";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";
import Subscribe from "../pages/Subscribe";
import Search from "../pages/Search";
import Watch from "../pages/watch";

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/" >
          <Route element={<Home />} index/>
          <Route element={<Login />} path="/login"/>
          <Route element={<Register />} path="/register"/>
          <Route element={<Show />} path="show"/>
          <Route element={<Watch />} path="watch"/>
          <Route element={<Wishlist />} path="/wishlist"/>
          <Route element={<Profile />} path="/profile"/>
          <Route element={<Search />} path="/search"/> {/* If we try to get in any page apart from our routes it will automatically redirect to home page */}
          <Route element={<Subscribe />} path="/subscribe"/>
          <Route element={<Home />} path="*"/> {/* If we try to get in any page apart from our routes it will automatically redirect to home page */}
        </Route>
      </Routes>

    </Router>
  )
}

export default App;
