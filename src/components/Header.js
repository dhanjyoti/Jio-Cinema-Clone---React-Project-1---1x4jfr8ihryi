import { Link, useLocation, useSearchParams } from "react-router-dom";
import Avatar from "./Avatar";
import Search from "./Search";
import useSearch from "../Utils/useSearch";
import { useEffect, useState } from "react";
import SearchIcon from "../icons/search";

//  added props with name children and to inside arrow function.

const HeaderLink = ({ children, to, active }) => {
    return (
        <li className="ml-2"><Link to={to} className="text-white font-bold text-sm px-3 py-2 block rounded-full" style={active ? { border: "1px solid white" } : {}}>{children}</Link></li>
    )
}

const Header = ({ items = [], onAvatarClicked }) => {
    const { search } = useSearch()

    const [searchText, setSearchText] = useState(null)

    const location = useLocation()

    useEffect(() => {
        if (searchText !== null) {
            search(searchText)
        }
    }, [searchText])


    const [showSearch, setShowSearch] = useState()

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0d0e10] flex flex-row items-center py-4 pr-3 sm:px-4 lg:px-0">
            {!showSearch && <span className="flex flex-row items-center lg:hidden">
                <a href="/" className="pl-5 min-w-[140px]"><img src="https://www.jiocinema.com/images/jc_logo_v2.svg" /></a>
                <a href="/subscribe" className=" ml-2 block px-2 py-0.5 font-bold text-sm rounded-full border-2" style={{ borderColor: 'rgb(166, 140, 87)', color: 'rgb(166, 140, 87)' }}>Subscribe</a>
            </span>}
            <span className="flex-row items-center hidden lg:flex">
                <a href="/" className="pl-5 min-w-[140px]"><img src="https://www.jiocinema.com/images/jc_logo_v2.svg" /></a>
                <a href="/subscribe" className=" ml-2 block px-2 py-0.5 font-bold text-sm rounded-full border-2" style={{ borderColor: 'rgb(166, 140, 87)', color: 'rgb(166, 140, 87)' }}>Subscribe</a>
            </span>
            <div className="hidden flex-row items-center lg:flex">
                <ul className="flex flex-row items-center gap-1 flex-1">
                    {/* created unique key using href(item.to) and item.label*/}
                    {items.map((item) => <HeaderLink active={"/"+decodeURIComponent(location.search) === item.to} key={item.to + item.label} to={item.to}>{item.label}</HeaderLink>)}
                </ul>
            </div>
            <div className="flex-1 flex flex-row items-center justify-end">
                <div className="hidden w-full lg:w-[180px] lg:block">
                    <Search placeholder={"Search"} value={searchText === null ? '' : searchText} onChange={({ target }) => setSearchText(target.value)} />
                </div>
                {showSearch && <div className="w-full lg:w-[180px] lg:hidden">
                    <Search placeholder={"Search"} value={searchText === null ? '' : searchText} onChange={({ target }) => setSearchText(target.value)} />
                </div>}
                <div className="ml-5 cursor-pointer lg:hidden" onClick={() => setShowSearch((prev) => !prev)}>{!showSearch ? <SearchIcon /> : <span className="text-4xl font-thin text-white">×</span>}</div>
                <div className=" hidden sm:flex ml-5 pr-5">
                    <Avatar logo={"https://www.jiocinema.com/images/profile/kids.svg"} onClick={onAvatarClicked} />
                </div>
            </div>
        </div>
    )
}

export default Header;