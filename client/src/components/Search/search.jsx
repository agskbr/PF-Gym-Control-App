import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchByName } from '../../store/actions'
import { getActivity } from '../../store/actions'
import style from "./search.module.css"

export default function Search() {

    let dispatch = useDispatch()

    let activities = useSelector(state => state.allActivities)

    const [search, setSearch] = useState('')

    function handleChange(event) {
        setSearch(event.target.value)

        if (event.target.value === '') dispatch(getActivity(activities))
    }

    function handleSubmit(event) {
        event.preventDefault()
        const filterSelect = document.getElementById('filter-day')
        filterSelect.selectedIndex = 0

        const order = document.getElementById('order')
        order.selectedIndex = 0

        dispatch(searchByName(search))
        console.log(search)
    }


    return (
        <form onSubmit={handleSubmit}>
                <input value={search} name='name' placeholder='Search...' onChange={handleChange} className={style.search}></input>
        </form>
    )
}