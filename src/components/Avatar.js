const Avatar = ({logo = "https://www.jiocinema.com/images/profile/kids.svg", onClick})=>{
    return <div className="overflow-hidden h-10 w-10 rounded-full cursor-pointer" onClick={onClick}><img src={logo} className="w-full h-full"/></div>
}

export default Avatar