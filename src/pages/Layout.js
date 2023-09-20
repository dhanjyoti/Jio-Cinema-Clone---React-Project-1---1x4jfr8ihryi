import { Outlet } from "react-router-dom";
import Header from "../components/Header";

// added array for Navbar Links.
const navItems = [
    {
      label: "For You",
      to: "/foryou"
    },
    {
      label: "Sports",
      to: "/sports"
    },
    {
      label: "Movies",
      to: "/movies"
    },
    {
      label: "TV Shows",
      to: "/tvshows"
    },
    {
      label: "NEWS",
      to: "/news"
    }
  ]
const Layout = () => {
    return (
        <div>
        <Header items={navItems} />
        <Outlet />
      </div>
    )
}

export default Layout;

