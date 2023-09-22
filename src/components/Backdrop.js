const Backdrop = ({children, onClick})=>{
    return <div onClick={onClick} className="fixed inset-0 bg-black/70">{children}</div>
}

export default Backdrop