import style from "./buy.module.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityById } from '../../store/actions';
import { useParams } from "react-router-dom";


export default function Buy() {

    const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getActivityById(id));
	}, [dispatch]);

    
        
    
    const {
		id: idActivity,
		name,
		description,
		video,
		image,
		price,
		day,
		hour,
		capacity,
	} = useSelector((state) => state.detail);


    console.log(this.state);
        
        return (
            <div className={style.background}>

                <div className={style.container}>
                    <div className={style.name}>{id.name}</div>
            
                    
            
                </div >

            </div >
        );
}
    