import { useEffect, useRef, useState } from "react";
import api from "../Utils/api";
import Card from "../components/Card";
import { titleCase } from "../Utils/commons";
import { useNavigate, useSearchParams } from "react-router-dom";
import News from "./News";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useScroll from "../Utils/useScroll";
import Loading from "../components/Loading";

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

    const fetchData = async (p) => {
        (async () => {
            try {
                let res = await api.getShows(p, category?.toLocaleLowerCase())
                if(!p){
                    setData(res.data)
                    onFetch(res.data)
                }else{
                    setData((prev)=>[...prev, ...res.data])
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

    return  <div key={category} className="flex flex-col">
        <div className="text-white whitespace-nowrap font-bold text-xl py-4 pl-5">{titleCase(category)}</div>
        <div className={"flex flex-row items-center gap-3 overflow-x-scroll no-scrollbar px-5 " + c}>
            {data.map((show) => {
                return <Card onClick={() => {
                    navigate("/show?id=" + show._id)
                }} thumbnail={show.thumbnail} key={show._id} />
            })}
            <div className="flex items-center justify-center p-5"><Loading size={30} /></div>
        </div>
        
    </div>
}
const Home = () => {
    const [showCollection, setShowCollection] = useState([])
    // api called for getting shows
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        if(showCollection && showCollection.length > 14){
            setShowCollection((prev)=>prev.splice(0, 14))
        }
    },[showCollection])
    return (
        // if type is news then it will render news component
        <>
            {showCollection && showCollection.length > 0 && <Splide options={{
                type: 'loop',
                arrows: null,
                autoplay: true,
            }} aria-label="Slideshow">
                {showCollection.map((cat) => cat.items.slice(0, 2).map((item) => <SplideSlide key={item._id}>
                    <img className="w-full aspect-video object-cover object-center max-h-[40vh]" src={item.thumbnail} alt={item.title} />
                </SplideSlide>))}
            </Splide>}
            {searchParams.get('type')?.toLowerCase() !== 'news' && <div className="flex flex-col gap-2 w-full">
                {
                    SECTIONS.filter((f)=>{
                        if(searchParams.get('type')){
                            return f === searchParams.get('type')?.toLowerCase()
                        }
                        return f
                    }).map((s) => <ShowSection key={s} category={s} onFetch={(data)=>{
                        setShowCollection((prev)=>[...prev, {category:s, items:data.splice(0, 2)}])
                    }}/>)
                }
            </div>}
            {searchParams.get('type')?.toLowerCase() === 'news' && <News />}
        </>
    )
}

export default Home;