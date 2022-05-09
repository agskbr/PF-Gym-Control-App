import { useDispatch } from "react-redux"
import { useState }  from "react"
import { filterRecipes } from "../../../../store/actions-recipes/recipes"
// import './style.css'




export default function Filter() {

    const [filter, setFilter] = useState('')


    let dispatch = useDispatch()

    function handleFilterChange(event) {
        event.preventDefault()
        setFilter(event.target.value)
        dispatch(filterRecipes(event.target.value))
    }

    return (
        <form className="filters">
            <select onChange={handleFilterChange} className="filter-by-day" id="filter-day">
                <option value='defaultFilter'> -- Filtrar -- </option>
                <option value='vegan'>Vegano</option>
                <option value='dairy free'>Sin lactosa</option>
                <option value='gluten free'>Gluten Free</option>
            </select>
        </form>
    )
}