import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchByName } from '../../store/actions'
import { getActivities } from '../../store/actions'

export default function Search() {

    let dispatch = useDispatch()

    let activities = useSelector(state => state.activities)

    const [search, setSearch] = useState('')

    function handleChange(event) {
        setSearch(event.target.value)

        if (event.target.value === '') dispatch(getActivities(activities))
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(searchByName(search))
        console.log(search)
    }


    return (
        <form onSubmit={handleSubmit}>
                <input value={search} name='name' placeholder='Search...' onChange={handleChange}></input>
        </form>
    )
}