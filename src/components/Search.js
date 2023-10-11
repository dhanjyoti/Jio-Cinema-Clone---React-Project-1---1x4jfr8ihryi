const Search = ({icon, value, onChange, placeholder, type, required, disabled, onClick})=>{
    return <div className="px-3 rounded-full border border-white flex flex-row items-center" onClick={onClick}>
        <input disabled={disabled} className="py-2 pr-1 bg-transparent outline-none flex-1 text-white" required={required} type={type} value={value} onChange={onChange} placeholder={placeholder}/>
        {icon}
    </div>
}

export default Search