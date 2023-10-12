import Facebook from "../icons/facebook.svg"
import Twitter from "../icons/twitter.svg"
import Insta from "../icons/instagram.svg"
import Youtube from "../icons/youtube.svg"
import GooglePlay from "../icons/googlePlay.svg"
import AppStore from "../icons/appleStore.svg"
import JioLogo from "../icons/jio-logo.png"

const support = [
    { label: "Help Center", to: "#" },
    { label: "Terms of Use", to: "#" },
    { label: "Privacy Policy", to: "#" },
    { label: "Content Complaints", to: "#" },
]

const FooterSection = ({ items, title }) => {
    return <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{title}</div>
        <ul className="flex flex-col gap-3 text-sm">
            {items?.map((i) => <li key={i.to+i.label}><a href={i.to}>{i.label}</a></li>)}
        </ul>
    </div>
}
const Footer = ({ items }) => {
    return <div className="flex flex-col pb-3 md:pb-[84px] lg:pb-0">
        <div className="bg-[#17181A] pt-12 pb-6 px-6 flex flex-col gap-6 md:flex-row justify-between">
            <FooterSection items={items} title={"JioCinema"} />
            <FooterSection items={support} title={"Support"} />
            <hr className="block md:hidden bg-white/10  border-white/10"/>
            <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold">Connect With Us</div>
                <ul className="flex flex-row gap-3">
                    <li>
                        <a className="block rounded-full bg-white/10 p-3.5" href="#">
                            <img src={Facebook} />
                        </a>
                    </li>
                    <li>
                        <a className="block rounded-full bg-white/10 p-3.5" href="#">
                            <img src={Twitter} />
                        </a>
                    </li>
                    <li>
                        <a className="block rounded-full bg-white/10 p-3.5" href="#">
                            <img src={Insta} />
                        </a>
                    </li>
                    <li>
                        <a className="block rounded-full bg-white/10 p-3.5" href="#">
                            <img src={Youtube} />
                        </a>
                    </li>
                </ul>
            </div>
            <hr className="block md:hidden bg-white/10 border-white/10"/>
            <div className="flex flex-col gap-3">
                <div className="text-2xl font-bold">Download The App</div>
                <ul className="flex flex-row gap-3">
                    <li>
                        <a className="block " href="#">
                            <img src={GooglePlay} />
                        </a>
                    </li>
                    <li>
                        <a className="block" href="#">
                            <img src={AppStore} />
                        </a>
                    </li>
                </ul>
            </div>

        </div>
        <div className="text-[0.75rem] flex border-t border-white/10 flex-row justify-between px-6 py-4 items-center" style={{background:"linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)),#17181A"}}>
            <p>Copyright © 2023 Viacom18 Media PVT LTD.All rights reserved.</p>
            <img src={JioLogo} width={48} height={48}/>
        </div>
    </div>
}

export default Footer