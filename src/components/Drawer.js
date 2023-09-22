import { useEffect, useState } from "react"
import Backdrop from "./Backdrop"

const Drawer = ({ children, show, showChange }) => {
    const [open, setOpenChange] = useState(show)
    useEffect(() => {
        setOpenChange(show)
    }, [show])

    if (!open) {
        return null
    }
    return <Backdrop onClick={() => {
        showChange(false)
    }}>
        <div className="flex flex-col fixed right-0 top-0 bottom-0 w-[360px] text-white">
            <div className="h-[72px]"></div>
            <div className="bg-[#0d0e10] flex-1">{children}</div>
        </div>
    </Backdrop>
}

export default Drawer