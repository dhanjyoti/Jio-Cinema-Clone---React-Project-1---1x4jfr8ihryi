// Made loading component using animate-spin to show loading status while doing api operations.
const Loading = ({size})=>{
    return <div className="flex rounded-full border-2 animate-spin" style={{height:size+"px", width:size+"px"}}></div>
}

export default Loading