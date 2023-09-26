import Loading from "./Loading"

const Button = ({content, onClick, type, loading})=>{
    return <button onClick={onClick} type={type} className="text-center rounded-md shadow bg-pink-600 px-3 py-2 text-white w-full flex flex-row items-center justify-center gap-3">
        {loading && <Loading size={16}/>}
        {content}
        </button>
}

export default Button