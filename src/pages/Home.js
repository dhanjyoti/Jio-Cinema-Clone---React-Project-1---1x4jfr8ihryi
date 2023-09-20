import { useEffect, useState } from "react";
import api from "../Utils/api";

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
            } else {
                console.log("Error fetching shows")
            }
        })()

    }, [])
    return (
        <div className="flex flex-col gap-7">
            {showCollection && showCollection.map((category)=>{
                return <div className="flex flex-col gap-2">
                    <div className="text-red-500">{category.category}</div>
                    <div className="grid grid-cols-4 gap-3">
                    {category.items.map((show)=>{
                        return <div>{show.title}</div>
                    })}
                    </div>
                    
                </div>
            })}
        </div>
    )
}

export default Home;