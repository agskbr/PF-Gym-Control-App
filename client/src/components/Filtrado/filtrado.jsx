import { useDispatch } from "react-redux"
import { useState } from "react/cjs/react.development"
import { filterByDay, orderActivities } from "../../store/actions"
import './style.css'




export default function Filtrado() {

    const [day, setDay] = useState('')
    const [order, setOrder] = useState('')


    let dispatch = useDispatch()

    function handleFilterChange(event) {
        event.preventDefault()
        setDay(event.target.value)
        dispatch(filterByDay(event.target.value))
        console.log(event.target.value)

        const order = document.getElementById('order')
        order.selectedIndex = 0
    }

    function handleOrderChange(event) {
        setOrder(event.target.value)
        dispatch(orderActivities(event.target.value))
    }

    return (
        <form className="filters">
            <select onChange={handleFilterChange} className="filter-by-day" id="filter-day">
                <option value='defaultFilter'> -- Por día -- </option>
                <option value='lunes'>Lunes</option>
                <option value='martes'>Martes</option>
                <option value='miercoles'>Miércoles</option>
                <option value='jueves'>Jueves</option>
                <option value='viernes'>Viernes</option>
                <option value='sabado'>Sábado</option>
                <option value='domingo'>Domingo</option>
            </select>

            <select onChange={handleOrderChange} className="order" id="order">
                <option value='defaultOrder'> -- Ordenar -- </option>
                <option value='precio'>Por precio</option>
                <option value='A-Z'>A &rarr; Z</option>
            </select>
        </form>
    )
}