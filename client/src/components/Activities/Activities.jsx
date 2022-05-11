import style from "./activities.module.css";

import React from 'react';
import Activity from '../Activity/Activity';
import { Link } from 'react-router-dom';


const Activities = ({ allActivities }) => {
 
	
	return (

		<div className={style.cards}>
            {
                      

                    allActivities?.map((activity) => (
                        <Link
                        to={`/clases/${activity.id}`}
                        style={{ textDecoration: 'none' }} key={activity.id}>

                            <Activity key={activity.id} {...activity} />.

                        </Link>
                    ))
                
            }

		</div>
	);
};

export default Activities;