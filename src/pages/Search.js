import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../Utils/api";
import { titleCase } from "../Utils/commons";
import Card from "../components/Card";

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

const Search = () => {
    const [showCollection, setShowCollection] = useState(null)

    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if(searchParams.get('search')){
            (async () => {
                try {
                    let res = await api.getShows(null, null, searchParams.get('search'))
                    setShowCollection(categorize(res.data))
                } catch (e) {
                    console.log("Error fetching shows", e)
                    setShowCollection([])
                }
            })()
        }else{
            setShowCollection(null)
        }

    }, [searchParams])

    return <div>{showCollection && showCollection.map((category) => {
        return <div key={category.category} className="flex flex-col">
            <div className="text-white whitespace-nowrap font-bold text-xl py-4 pl-5">{`"${searchParams.get('search')?searchParams.get('search'):''}" in `}{titleCase(category.category)}</div>
            <div className="flex flex-row items-center gap-3 overflow-x-scroll no-scrollbar px-5">
                {category.items.map((show) => {
                    return <Card onClick={() => {
                        navigate("/show?id=" + show._id)
                    }} thumbnail={show.thumbnail} key={show._id} />
                })}
            </div>
            
        </div>
    })}
    {!searchParams.get('search') && <div className="text-center pt-10">Start searching...</div>}
    {searchParams.get('search') && (!showCollection || showCollection?.length === 0)  && <div className="text-center pt-10">No result found for "{searchParams.get('search')}"</div>}
    </div>
}

export default Search