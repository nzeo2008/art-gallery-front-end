import React from 'react';
import { Link } from 'react-router-dom';
import { api } from './../../../config';
import styles from './events.section.module.css';

function EventsSection(props) {
	const { title, image, index, events } = props;
	return (
		<div className={styles.container}>
			<img src={api.baseUrl + image} alt={title} />
			<Link to={`/events/${title}`} className={styles.link} state={{ index, events }}>
				<h5>{title}</h5>
			</Link>
		</div>
	);
}

export default EventsSection;
