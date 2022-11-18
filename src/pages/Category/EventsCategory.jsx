import React, { useState, useEffect } from 'react';
import styles from './category.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../../services/admin.services';
import { api } from './../../config';
import { scrollOnTop } from './../../services/common.service';
import { format, parseISO } from 'date-fns';
import Banner from '../../components/Banner/Banner';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import EventCard from './../Events/EventsSections/EventCard';

function EventsCategory() {
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const params = useParams();
	const navigate = useNavigate();

	async function fetchData() {
		const { data } = await getData(api.searchEventCategoryEndpoint, {
			category: params.category,
		});

		if (data.length === 0) return navigate('not-found');

		setEvents(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchData();
		scrollOnTop();
	}, [params]);

	return (
		<>
			<Banner
				from={params.category}
				imagePath='/images/Free-image-1.jpg'
				altName='Free-image-1.jpg'
			/>
			{!isLoading ? (
				<section className={styles.cards_container}>
					{events.map((item) => {
						const { title, article, createdAt, images, alias, _id } = item;

						return (
							<EventCard
								_id={_id}
								alias={alias}
								key={alias}
								title={title}
								article={article}
								date={format(parseISO(createdAt), 'dd/MM/yyyy')}
								image={api.baseUrl + images[0]}
							/>
						);
					})}
				</section>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}

export default EventsCategory;
