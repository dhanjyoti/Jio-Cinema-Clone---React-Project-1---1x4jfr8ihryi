const NavItem = ({children, onClick})=>{
    return <a onClick={onClick} className="text-lg py-3 block cursor-pointer hover:opacity-60">{children}</a>
}

export const NavSeparator = ()=><div className="h-px my-3 bg-gray-300"></div>

export default NavItem;