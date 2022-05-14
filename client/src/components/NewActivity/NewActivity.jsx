import style from './newActivity.module.css';
import { getActivityById } from '../../store/actions';

export default function NewActivity(data) {
    let text = data.description.substring(0, 300);
    let daysHour = data.diaHoras;


    function filterDays(daysHour){
        var days ={};
        var out = daysHour.filter(function(element){
            return days.hasOwnProperty(element)? false : (days[element]=true);
        });
        return out;
    }

    return (

        <div className={style.flipContainer} id={data.id}>
            <div className={style.card} id={data.id}>
                <img src={data.image} className={style.image} alt="imagen de actividad" id={data.id}/>
                <div className={style.title} id={data.id}>{data.name}</div>
                <div className={style.price} id={data.id}>${data.price}</div>
                <div className={style.back} id={data.id} >{text}...
                <p>Dias:</p>
                <div className={style.dias}>
                
                {
                    filterDays(daysHour).map((dia) => (
                        <div key={Math.random(0,100)} className={style.dia} id={data.id}>
                            <div className={style.diaTitle} id={data.id}> {dia.day}</div>
                        </div>
                    ))
                }
                </div>
                </div>
            
            </div>
        </div>
    )
}
