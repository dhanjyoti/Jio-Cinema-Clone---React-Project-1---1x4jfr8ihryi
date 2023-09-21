const Input = ({icon, value, onChange, placeholder, type, required})=>{
    return <div className="px-3 rounded-xl border border-white flex flex-row items-center">
        <input className="py-2 pr-1 bg-transparent outline-none flex-1 text-white" required={required} type={type} value={value} onChange={onChange} placeholder={placeholder}/>
        {icon}
    </div>
}

export default Input