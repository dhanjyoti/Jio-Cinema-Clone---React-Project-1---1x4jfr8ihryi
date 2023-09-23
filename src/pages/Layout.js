import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import { useState } from "react";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import useUser from "../Utils/useUser";
import NavItem, { NavSeparator } from "../components/NavItem";

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
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user, setUser } = useUser()

  console.log(user);
  const navigate = useNavigate()
  return (
    <div className="w-full bg-[#0d0e10] min-h-screen">
      <Header items={navItems} onAvatarClicked={() => {
        setOpenDrawer(true)
      }} />
      <Outlet />
      <Drawer show={openDrawer} showChange={() => setOpenDrawer(false)}>
        <div className="p-4">
          <div className="rounded-lg bg-[#ffffff29] mt-10 px-4 py-6 flex flex-col gap-4 items-center">
            <div className="-mt-11"><Avatar /></div>
            <div>{user?<div className="flex flex-col items-center">
              <div className="font-bold text-2xl">{user.data?.name}</div>
              <div className="text-xs">{user.data?.email}</div>
            </div>:"Guest"}</div>
            {/* If there is no user logged in then it will show login and register ui. */}
            {!user && <>
              <div className="w-fit">
                <Button content={"Login"} onClick={() => {
                  navigate("/login")
                }} />
              </div>
              <div>New to the JioCinema? <a className="text-sky-600" href="/register">Register</a></div>
            </>}
          </div>

          {/* IF there user logged in then following items will be show in the ui. */}
          {user && <div className="mt-3">
            <NavItem>Edit profile</NavItem>
            <NavItem onClick={()=>{
              navigate("/wishlist")
            }}>Wishlist</NavItem>
            <NavSeparator/>
            <NavItem onClick={()=>{
              setUser(null)
              navigate("/")
            }}>Logout</NavItem>
          </div>}
        </div>
      </Drawer>
    </div>
  )
}

export default Layout;

