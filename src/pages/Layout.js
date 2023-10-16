import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import useUser from "../Utils/useUser";
import NavItem, { NavSeparator } from "../components/NavItem";
import Footer from "../components/Footer";
import HomeIcon from "../icons/home";
import MovieIcon from "../icons/movie";
import TvShowIcon from "../icons/tvshow";
import MoreIcon from "../icons/more";



// added array for Navbar Links.
const navItems = [
  {
    label: "For you",
    to: "/"
  },
  {
    label: "Web series",
    to: "/?type=Web series"
  },
  {
    label: "Tv show",
    to: "/?type=Tv show"
  },
  {
    label: "Movie",
    to: "/?type=movie"
  },
  {
    label: "Trailer",
    to: "/?type=Trailer"
  },
  {
    label: "NEWS",
    to: "/?type=news"
  }
]

const footerItems = [
  {
    label: "For you",
    to: "/"
  },
  {
    label: "Web series",
    to: "/?type=Web series"
  },
  {
    label: "Tv show",
    to: "/?type=Tv show"
  },
  {
    label: "Movie",
    to: "/?type=movie"
  }
]

const FooterList = [
  {
    label: "For you",
    to: "/",
    icon:<HomeIcon/>
  },
  {
    label: "Movie",
    to: "/?type=movie",
    icon:<MovieIcon/>
  },
  {
    label: "Tv show",
    to: "/?type=Tv show",
    icon:<TvShowIcon/>
  }
]
const FooterMenu = ({onMoreClicked}) => {
  const location = useLocation()
  return <ul className=" px-2 bg-[#0d0e10] fixed bottom-0 left-0 right-0 flex flex-row items-center justify-around z-50 text-white" style={{boxShadow: '0px -10px 20px -4px rgba(0,0,0,0.75)'}}>
    {FooterList.map((fl)=>{
      return <FooterLink key={fl.to} icon={fl.icon} to={fl.to} active={"/"+decodeURIComponent(location.search.toLowerCase()) === fl.to.toLowerCase()}>{fl.label}</FooterLink>})}
    <li onClick={onMoreClicked} className="flex flex-col items-center justify-between gap-1 text-sm md:text-md py-5 text-center text-white md:font-bold">
      <span className="h-5 block">
      <MoreIcon/>
      </span>
      More
      </li>
  </ul>
}

const FooterLink = ({ children, to, icon, active }) => {
  return (
      <li className=""><Link to={to} className="flex flex-col items-center gap-1 text-sm md:text-md py-5 text-center text-white md:font-bold" style={active ? { color: "#ff4ef5" } : {}}>
        <span className="h-5 block">
        {icon}
        </span>
        {children}
        </Link></li>
  )
}

const Layout = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user, setUser } = useUser()
  const location = useLocation()

  const navigate = useNavigate()

  useEffect(()=>{
    setOpenDrawer(false)
  },[location])
  useEffect(()=>{
    if(openDrawer){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto"
    }
  },[openDrawer])


  useEffect(()=>{
    // document.body.scrollTop = 0
    console.log(document.scrollingElement.scrollTop);
    document.scrollingElement.scrollTop = 0
  },[location])
  return (
    <div className="w-full bg-[#0d0e10] min-h-screen pt-[68px] pb-16 md:pb-0">
      <Header items={navItems} onAvatarClicked={() => {
        setOpenDrawer(true)
      }} />
      <div className="pb-2 min-h-screen">
      <Outlet />
      </div>
      <Drawer show={openDrawer} showChange={() => setOpenDrawer(false)}>
        <div className="p-4">
          <div className="rounded-lg bg-[#ffffff29] mt-10 px-4 py-6 flex flex-col gap-4 items-center">
            <div className="-mt-11"><Avatar logo={user?.data?.profileImage?user?.data?.profileImage:'https://www.jiocinema.com/images/profile/kids.svg'}/></div>
            <div>{user ? <div className="flex flex-col items-center">
              <div className="font-bold text-2xl">{user.data?.name}</div>
              <div className="text-xs">{user?.data?.email}</div>
            </div> : "Guest"}</div>
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
            <NavItem onClick={() => {
              navigate("/profile")
            }}>Edit profile</NavItem>
            <NavItem onClick={() => {
              navigate("/wishlist")
            }}>Wishlist</NavItem>
            <NavSeparator />
            <NavItem onClick={() => {
              setUser(null)
              navigate("/")
            }}>Logout</NavItem>
          </div>}
        </div>
      </Drawer>
      <div className="lg:hidden">
      <FooterMenu onMoreClicked={()=>{
         setOpenDrawer((prev)=>!prev)
      }}/>
      </div>
      <Footer items={footerItems}/>
    </div>
  )
}

export default Layout;

