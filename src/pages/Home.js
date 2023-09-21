import { useEffect, useState } from "react";
import api from "../Utils/api";
import Card from "../components/Card";
import { titleCase } from "../Utils/commons";

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
const Home = () => {
    const [showCollection, setShowCollection] = useState(null)

    // api called for getting shows

    useEffect(() => {
        (async () => {
            let res = await api.getShows()
            if (res) {
                setShowCollection(categorize(res.data))
                console.log(res.data)
            } else {
                console.log("Error fetching shows")
            }
        })()

    }, [])
    return (
        <div className="flex flex-col gap-2 w-full">
            {showCollection && showCollection.map((category)=>{
                return <div className="flex flex-col">
                    <div className="text-white whitespace-nowrap font-bold text-xl py-4 pl-5">{titleCase(category.category)}</div>
                    <div className="flex flex-row items-center gap-3 overflow-x-scroll no-scrollbar px-5">
                    {category.items.map((show)=>{
                        return <Card thumbnail={show.thumbnail} key={show._id}/>
                    })}
                    </div>
                    
                </div>
            })}
        </div>
    )
}

export default Home;