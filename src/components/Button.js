const Button = ({content, onClick, type})=>{
    return <button onClick={onClick} type={type} className="rounded-md shadow bg-pink-600 px-3 py-2 text-white w-full">{content}</button>
}

export default Button