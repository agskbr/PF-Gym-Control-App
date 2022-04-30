import style from "./activities.module.css";

import React from 'react';
import Activity from '../Activity/Activity';
import { Link } from 'react-router-dom';


const Activities = ({ allActivities }) => {

	console.log(allActivities);

	return (

		<div className={style.cards}>
            {
                allActivities?.map((activity) => (
                    <Activity key={activity.id} {...activity} />
                ))

            }







			{/* {allActivities.length ? (
				allActivities.map((act) => {
					return (
						<Link
							to={`/activity/${act.id}`}
							style={{ textDecoration: 'none' }}
						>
							<Activity
								key={act.id}
								id={act.id}
								name={act.name}
                                description={act.description}
								image={act.image}
								price={act.price}
                                day={act.day}
                                hour={act.hour}
								capacity={act.capacity}
							/>
						</Link>
					);
				})
			) 
        } */}
		</div>
	);
};

export default Activities;