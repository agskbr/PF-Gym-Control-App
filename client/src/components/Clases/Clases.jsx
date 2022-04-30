import style from "./clases.module.css";


const Clases = () => {

return (

    <div className={style.container}>
        
        <div className={style.info}>
            <p>+</p>
            <p>de 10 actividades</p>
            <p>con los mejores profesionales</p>

            <button>Reserva tu clase ahora</button>
        
            <div className={style.donWait}> 
            No esperes mas
            </div>
        </div>
        
        <div className={style.clases}>
            
        </div>

    </div>

    )

}

export default Clases;