import { Link } from "react-router-dom";

//  added props with name children and to inside arrow function.
const HeaderLink = ({ children, to }) => {
    return (
        <li className="ml-2"><Link to={to} className="text-white font-bold text-sm px-3 py-2 block">{children}</Link></li>
    )
}

const Header = ({ items = [] }) => {
    return (
        <div className="bg-[#0d0e10]">
            <ul className="flex flex-row items-center gap-2">
                {items.map((item) => <HeaderLink to={item.to}>{item.label}</HeaderLink>)}
            </ul>
        </div>
    )
}

export default Header;