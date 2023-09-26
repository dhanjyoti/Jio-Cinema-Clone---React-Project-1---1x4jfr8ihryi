import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import useUser from "../Utils/useUser";
import Input from "./Input";
import Search from "./Search";
import useSearch from "../Utils/useSearch";
import { useEffect, useState } from "react";

//  added props with name children and to inside arrow function.
const HeaderLink = ({ children, to }) => {
    return (
        <li className="ml-2"><Link to={to} className="text-white font-bold text-sm px-3 py-2 block">{children}</Link></li>
    )
}

const Header = ({ items = [], onAvatarClicked }) => {
    const {search}=useSearch()

    const [searchText, setSearchText] = useState('')

    useEffect(()=>{
        search(searchText)
    },[searchText])
    return (
        <div className="bg-[#0d0e10] flex flex-row items-center py-4">
            <a href="/" className="pl-5"><img src="https://www.jiocinema.com/images/jc_logo_v2.svg"/></a>
            <ul className="flex flex-row items-center gap-1 flex-1">
                {items.map((item) => <HeaderLink to={item.to}>{item.label}</HeaderLink>)}
            </ul>
            <Search placeholder={"Search"} value={searchText} onChange={({target})=>setSearchText(target.value)}/>
            <div className="ml-5 pr-5">
                <Avatar logo={"https://www.jiocinema.com/images/profile/kids.svg"} onClick={onAvatarClicked}/>
            </div>
        </div>
    )
}

export default Header;