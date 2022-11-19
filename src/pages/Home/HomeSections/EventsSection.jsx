import React from 'react';
import _ from 'lodash';
import styles from './events.section.module.css';
import { Link } from 'react-router-dom';
import { api } from './../../../config';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function EventsSection({ events }) {
	return events.length === 0 ? (
		<LoadingSpinner />
	) : (
		<section className={styles.events_section}>
			{_.slice(events, 0, 9).map((event) => {
				return (
					<div key={event.alias} className={styles.event_image_container}>
						<img src={api.baseUrl + event.images[0]} alt={event.alias} />
						<div className={styles.black_box}></div>
						<div className={styles.event_text}>
							<Link to={`../category/events/${event.category}`}>
								{event.category}
							</Link>
							<Link to={`../events/${event.alias}`}>{event.title}</Link>
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default EventsSection;
