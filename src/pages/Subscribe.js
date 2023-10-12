import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../Utils/api"
import useRandom from "../Utils/useRandom";
import { titleCase } from "../Utils/commons";

import bg from "../bg.png"
import { Splide, SplideSlide } from "@splidejs/react-splide";

const categorize = (items) => {

    return items.reduce((accumulator, item) => {
        const category = item.type;

        // Find the category object in the accumulator
        const categoryObject = accumulator.find((cat) => cat.category === category);

        if (categoryObject) {
            categoryObject.items.push(item); // Add the item to the existing category
        } else {
            accumulator.push({ category, items: [item] }); // Create a new category with the item
        }

        return accumulator;
    }, []);

}

const Subscribe = () => {
    const [showCollection, setShowCollection] = useState([])

    const navigate = useNavigate()
    // api called for getting shows
    const { shuffle } = useRandom({})

    useEffect(() => {
        (async () => {
            try {
                let res = await api.getShows()
                let cat = categorize(res.data)
                setShowCollection(cat)
            } catch (e) {
                console.log("Error fetching shows", e)
                setShowCollection([])
            }
        })()

    }, [])

    return <div className="flex flex-col" style={{ background: `url(${bg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>

        {showCollection && showCollection.length > 0 && <div className="relative flex flex-row">
            <Splide options={{
                type: 'loop',
                arrows: null,
                autoplay: true,
            }} aria-label="Slideshow">
                {showCollection.map((cat) => cat.items.slice(0, 1).map((item) => <SplideSlide key={item._id} className="relative">
                    <img className="w-full aspect-video object-cover object-center max-h-[40vh]" src={item.thumbnail} alt={item.title} />
                    <div className="absolute bottom-0 left-0 right-0 w-full pb-5" style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }}>
                        <div className="flex flex-col gap-1 md:max-w-[50%] py-3 px-3 md:pl-20" >
                            <div className="text-2xl font-bold">&nbsp;{titleCase(cat?.category)}</div>
                            <div className="flex flex-row flex-wrap items-center text-xs">{cat?.items?.slice(0, 7).map((item, index) => {
                                return <div key={item._id+""+index} className="after:content-[','] last:after:content-['']">&nbsp;&nbsp;{item.title}</div>
                            })}</div>
                        </div>
                    </div>
                </SplideSlide>))}
            </Splide>
        </div>
        }

        <div className="flex flex-col text-center p-10 gap-5">
            <div className="text-xl md:text-3xl font-bold">JioCinema Premium</div>
            <div className="text-md md:text-lg">Welcome to the new home of all your favourite Hollywood content. The biggest, the best. Exclusively yours.
            </div>
        </div>
        <div className="p-4 self-center border-2 rounded-[10px] min-h-[176px] md:w-[492px]" style={{ borderColor: 'rgb(166, 140, 87)', background: 'radial-gradient(86.28% 289.13% at 50% 50%, #57005B 0%, #300D31 50%)' }}>
            <div className="text-lg md:text-2xl font-bold">Best of Hollywood</div>
            <ul className="text-sm md:text-md pl-4  pt-2">
                <li>Watch on any device</li>
                <li>Highest video & audio quality</li>
                <li>Upto 4 devices simultaneously</li>
            </ul>
            <div className="flex flex-row pt-3 justify-between">
                <div className="rounded border p-1 text-sm h-fit font-semibold" style={{ color: 'rgb(255, 224, 150)', borderColor: 'rgb(166, 140, 87)' }}>12 Months</div>
                <div className="flex flex-row  font-bold gap-1">
                    <span className="self-start text-lg">₹</span>
                    <div className="text-xl md:text-4xl">
                        999
                    </div>
                </div>
            </div>
        </div>
        <div className="text-xs mt-10 text-center">
            By continuing you agree to our <a href="/" className="text-[#ff4ef5]">Terms of Use</a> and acknowledge that you have read our <a href="/" className="text-[#ff4ef5]">Privacy Policy</a>.
        </div>
    </div>
}

export default Subscribe