import { useState } from "react"
import { useSelector, useDispatch} from "react-redux"
import { changePage } from "../../store/actions"
import "./style.css"


export default function Paginado() {

    const [currentValue, setCurrentValue] = useState(1)

    let activities = useSelector(state => state.pgym.activities)
    // let [[a]] = useSelector(state => state.pagina)
    
    let pages = Math.ceil(activities.length / 3);
    // 
    var numberOfPages = [] 

    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    let dispatch = useDispatch()

    function handleClick(event) {
        event.preventDefault()
        setCurrentValue(event.target.value)
        dispatch(changePage(event.target.value))
    }

    function handleLeftClick(event) {
        event.preventDefault()
        setCurrentValue(currentValue - 1)
        dispatch(changePage(currentValue - 1))
    }

    function handleRightClick(event) {
        event.preventDefault()
        setCurrentValue(currentValue + 1)
        dispatch(changePage(currentValue + 1))
    }


    let value = 0
    let buttons = numberOfPages.map(page => {
        value++
        return (<button key={value} value={value} className="number" onClick={handleClick}>{page}</button>)
    })

    let arrowLeft = currentValue > 1 ? (
        <button className="arrow arrow-left" onClick={handleLeftClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    ) : 
    <button className="hidden">
    <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    </button>

    let arrowRight = currentValue >= numberOfPages.length ? 
        <button className="hidden">
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button> : (
        <button className="arrow arrow-right" onClick={handleRightClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    )
    
    
    return (
        <div className="pagination">
        {arrowLeft}
        {buttons}
        {arrowRight}
    </div>
    )
}