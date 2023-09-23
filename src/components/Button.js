const Button = ({content, onClick, type, loading})=>{
    return <button onClick={onClick} type={type} className="text-center rounded-md shadow bg-pink-600 px-3 py-2 text-white w-full flex flex-row items-center justify-center gap-3">
        {loading && <div className="flex w-4 h-4 rounded-full border-2 animate-spin"></div>}
        {content}
        </button>
}

export default Button