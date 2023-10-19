import { useEffect, useRef, useState } from "react";
import api from "../Utils/api";
import Card from "../components/Card";
import { titleCase } from "../Utils/commons";
import { useNavigate, useSearchParams } from "react-router-dom";
import News from "./News";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useScroll from "../Utils/useScroll";
import Loading from "../components/Loading";
import ArrowRight from "../icons/Arrow.svg"

import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'

import Image1 from "../images/pic1.webp"
import Image2 from "../images/pic2.webp"
import Image3 from "../images/pic3.webp"
import Image4 from "../images/pic4.jpg"
import Image5 from "../images/pic5.webp"
import Image6 from "../images/pic6.webp"
import Image7 from "../images/pic7.jpg"
import Image8 from "../images/pic8.jpg"
import Image9 from "../images/pic9.webp"

const Images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9]

const SECTIONS = ["video song", "web series", "tv show", "short film", "movie", "documentary", "trailer"]
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

const ShowSection = ({ category, onFetch }) => {
    let c = category.toLowerCase().replace(' ', '-')
    const isEnd = useScroll({ className: c })
    const [page, setPage] = useState(2)
    const fetchingRef = useRef(null)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();

    const [scrolledLeft, setScrolledLeft]=useState(false)

    const fetchData = async (p) => {
        (async () => {
            try {
                let res = await api.getShows(p, category?.toLocaleLowerCase())
                    // If no page no. or page shown first time
                if (!p) {
                    setData(res.data)
                    onFetch(res.data)
                    // If used before, it will append to previous data
                } else {
                    setData((prev) => [...prev, ...res.data])
                }
            } catch (e) {
                console.log("Error fetching shows", e)
                setData([])
            }
        })()
    }

    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        if (isEnd) {
            console.log(fetchingRef.current);
            if (fetchingRef.current) {
                return
            }
            fetchingRef.current = setTimeout(async () => {
                await fetchData(page)
                setPage((prev) => prev + 1)
                fetchingRef.current == null
            }, 1000);

            return () => {
                clearTimeout(fetchingRef.current)
                fetchingRef.current = null
            }
        }
    }, [isEnd])

    const scroller = useRef(null)

    const onScrollRight = () => {
        scroller.current.style.scrollBehavior = "smooth"
        scroller.current.scrollLeft += 600
        setScrolledLeft(scroller.current.scrollLeft > 35)
        scroller.current.style.scrollBehavior = "auto"
    }

    const onScrollLeft = () => {
        scroller.current.style.scrollBehavior = "smooth"
        scroller.current.scrollLeft -= 600
        setScrolledLeft(scroller.current.scrollLeft > 35)
        scroller.current.style.scrollBehavior = "auto"
    }

    const onScrollerScrolls = (e)=>{
        setScrolledLeft(scroller.current.scrollLeft > 35)
        console.log('scrolled');
    }

    console.log(scrolledLeft);
    return <div key={category} className="select-none flex flex-col">
        <div className="select-none flex flex-row justify-between items-center text-white whitespace-nowrap font-bold text-xl py-4 pl-5">
            <div>{titleCase(category)}</div>
           {!searchParams.get('type') && <div className="px-5 cursor-pointer" onClick={() => {
                navigate("/?type=" + category)
            }}><img src={ArrowRight} /></div>}
        </div>
        <div className="relative group">
            {/* For horizontal scrolling react-indiana-scroller is used */}
            <ScrollContainer onScroll={onScrollerScrolls} className={c}  ref={scroller}>
                <div className={"group relative flex flex-row items-center gap-3 px-5"}>
                    {data.map((show) => {
                        return <Card onClick={() => {
                            navigate("/show?id=" + show._id)
                        }} thumbnail={show.thumbnail} key={show._id} />
                    })}

                    <div className="flex items-center justify-center p-5"><Loading size={30} /></div>
                </div>
            </ScrollContainer>
            <div onClick={() => {
                onScrollRight()
            }} className="cursor-pointer top-0 transition-all duration-500 opacity-0 invisible group-hover:visible group-hover:opacity-100 absolute h-full right-0 text-white w-[64px] flex items-center justify-center" style={{ background: 'linear-gradient(270deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 96.38%)' }}>
                <svg height={20} width={20} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon"><path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" fill="currentColor"></path></svg>
            </div>
            {scrolledLeft && <div onClick={() => {
                onScrollLeft()
            }} className="cursor-pointer top-0 transition-all duration-500 opacity-0 invisible group-hover:visible group-hover:opacity-100 absolute h-full left-0 text-white w-[64px] flex items-center justify-center" style={{ background: 'linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 96.38%)' }}>
                <svg className="rotate-180" height={20} width={20} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon"><path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" fill="currentColor"></path></svg>
            </div>}
        </div>
    </div>
}
const Home = () => {
    const [showCollection, setShowCollection] = useState([])
    // api called for getting shows
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (showCollection && showCollection.length > 14) {
            setShowCollection((prev) => prev.splice(0, 14))
        }
    }, [showCollection])
    return (
        // if type is news then it will render news component
        <>
            { Images.length > 0 && <Splide options={{
                type: 'loop',
                arrows: null,
                autoplay: true,
            }} aria-label="Slideshow">
                {Images.map((cat, index) => <SplideSlide key={cat}>
                    <img className="w-full aspect-video object-cover object-top max-h-[60vh]" src={cat} alt={cat} />
                    <div className="absolute bottom-0 left-0 right-0 w-full pb-5" style={{ background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)" }}>
                        <div className="flex flex-col gap-1 md:max-w-[50%] mb-5 py-3 px-3 md:pl-20" >
                            <div className="text-4xl font-bold">&nbsp;{showCollection?.[index]?.items[0]?.title ? titleCase(showCollection?.[index]?.items[0]?.title) : ''}</div>
                        </div>
                    </div>
                </SplideSlide>)}
            </Splide>}
            {searchParams.get('type')?.toLowerCase() !== 'news' && <div className="flex flex-col gap-2 w-full">
                {
                    SECTIONS.filter((f) => {
                        if (searchParams.get('type')) {
                            return f === searchParams.get('type')?.toLowerCase()
                        }
                        return f
                    }).map((s) => <ShowSection key={s} category={s} onFetch={(data) => {
                        setShowCollection((prev) => [...prev, { category: s, items: data.splice(0, 2) }])
                    }} />)
                }
            </div>}
            {searchParams.get('type')?.toLowerCase() === 'news' && <News />}
        </>
    )
}

export default Home;