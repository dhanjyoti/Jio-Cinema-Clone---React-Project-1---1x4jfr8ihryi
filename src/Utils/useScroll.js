import { useEffect, useState } from "react"

const useScroll = ({className})=>{
    const [isEnd, setIsEnd] = useState(false)
    useEffect(()=>{
        let element = document.querySelector("."+className)
        const listener = (e)=>{
            // console.log(element.scrollLeft+element.clientWidth, element.scrollWidth);
            setIsEnd(element.scrollLeft+element.clientWidth>element.scrollWidth - 20)
        }

        element?.addEventListener('scroll', listener)

        return ()=>{
            element?.removeEventListener('scroll', listener)
        }
    },[])

    return isEnd
}

export default useScroll