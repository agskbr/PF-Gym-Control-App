import { useDispatch } from "react-redux"
import { useState } from "react/cjs/react.development"
import { filter } from "../../store/actions"




export default function Filtrado() {

    const [day, setDay] = useState('')

    let dispatch = useDispatch()

    function handleChange(event) {
        event.preventDefault()
        setDay(event.target.value)
        dispatch(filter(event.target.value))
        
    }

    return (
        <form>
            <select onChange={handleChange} className="filter-by-day">
                <option value='defaultFilter'> -- Por día -- </option>
                <option value='lunes'>Lunes</option>
                <option value='martes'>Martes</option>
                <option value='miercoles'>Miércoles</option>
                <option value='jueves'>Jueves</option>
                <option value='viernes'>Viernes</option>
                <option value='sabado'>Sábado</option>
                <option value='domingo'>Domingo</option>
            </select>
        </form>
    )
}