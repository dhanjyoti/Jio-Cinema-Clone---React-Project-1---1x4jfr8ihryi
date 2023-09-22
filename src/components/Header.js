import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import useUser from "../Utils/useUser";

//  added props with name children and to inside arrow function.
const HeaderLink = ({ children, to }) => {
    return (
        <li className="ml-2"><Link to={to} className="text-white font-bold text-sm px-3 py-2 block">{children}</Link></li>
    )
}

const Header = ({ items = [], onAvatarClicked }) => {

    return (
        <div className="bg-[#0d0e10] flex flex-row items-center justify-between py-4">
            <ul className="flex flex-row items-center gap-2">
                {items.map((item) => <HeaderLink to={item.to}>{item.label}</HeaderLink>)}
            </ul>
            <div className="pr-5">
                <Avatar logo={"https://www.jiocinema.com/images/profile/kids.svg"} onClick={onAvatarClicked}/>
            </div>
        </div>
    )
}

export default Header;