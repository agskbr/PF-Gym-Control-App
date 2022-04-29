
import './style.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getActivities } from '../../store/actions'
import Search from '../Search/search'
import Filtrado from '../Filtrado/filtrado'

export default function Clases() {


    let dispatch = useDispatch()

    let activities = useSelector(state => state.currentPage)

    useEffect(() => {
            dispatch(getActivities(activities))
    }, [])

    let renderedActivities = activities.map(act => {
        return (
                <div className="activity" key={act.id}>
                    <p>id: {act.id}</p>
                    <h3>{act.name}</h3>
                    <p>precio: {act.price}</p>
                </div>
            
        )
    })

    return (
            <div>
                <Filtrado />
                <Search />
                <div className='all-activities'>
                {renderedActivities}
                </div>
            </div>
            
        
    )
}