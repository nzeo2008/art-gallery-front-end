import React, { useState, useEffect, useCallback } from 'react';
import bannerLogo from '../../images/Events-2.jpg';
import Banner from '../../components/Banner/Banner';
import { deleteData } from '../../services/admin.services';
import { api } from './../../config';
import styles from './events.module.css';
import { format, parseISO } from 'date-fns';
import LostContent from '../LostContent/LostContent';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { toastLoading, toastUpdate } from './../../services/toasts.service';
import CustomButton from './../../components/Button/CustomButton';
import { scrollOnTop } from '../../services/common.service';
import EventCard from './EventsSections/EventCard';

function Events({ events, user, setEvents }) {
	const [slicedState, setSlicedState] = useState([]);
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(6);

	const pageLimit = 6;

	const navigate = useNavigate();

	const goBack = useCallback(() => {
		setStartIndex(0);
		setEndIndex(pageLimit);
		setSlicedState(_.slice(events, startIndex, endIndex));
		scrollOnTop();
	}, [startIndex, endIndex, events]);

	useEffect(() => {
		setSlicedState(_.slice(events, startIndex, endIndex));
	}, [goBack, events, startIndex, endIndex]);

	async function nextPage() {
		setStartIndex(endIndex);
		setEndIndex(endIndex + pageLimit);
		setSlicedState(_.slice(events, startIndex, endIndex));
		scrollOnTop();
	}

	function handleUpdate(_id) {
		const [event] = events.filter((event) => {
			return event._id === _id;
		});
		const data = { data: event, isUpdate: true, from: 'event' };
		navigate('/admin', { state: data });
	}

	async function handleDelete(_id) {
		const toastId = toastLoading();
		const updatedEvents = events.filter((event) => {
			return event._id !== _id;
		});

		try {
			setEvents(updatedEvents);
			await deleteData(api.deleteEventEndpoint, { _id });

			toastUpdate(toastId, 'Успешно удалено', 'success');
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				setEvents(events);
				toastUpdate(toastId, 'Событие не удалось удалить', 'error');
			} else {
				setEvents(events);
				toastUpdate(toastId, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<>
			<Banner imagePath={bannerLogo} from='События' altName='Location-Banner.jpg' />
			<div className={styles.container}>
				<div className={styles.items_container}>
					{events.length !== 0 ? (
						slicedState.map((item, index) => {
							const { title, article, createdAt, images, alias, _id } = item;

							return (
								<EventCard
									handleDeleteEvent={handleDelete}
									handleUpdate={handleUpdate}
									user={user}
									_id={_id}
									alias={alias}
									key={alias}
									title={title}
									article={article}
									date={format(parseISO(createdAt), 'dd/MM/yyyy')}
									image={images.length !== 0 ? api.baseUrl + images[0] : null}
								/>
							);
						})
					) : (
						<LostContent />
					)}
				</div>
				{events.length >= endIndex && (
					<CustomButton handleClick={nextPage} style={styles.button} name='Дальше' />
				)}
				{events.length < endIndex && startIndex !== 0 && (
					<CustomButton
						handleClick={goBack}
						style={styles.button}
						name='Вернуться назад'
					/>
				)}
			</div>
		</>
	);
}
export default Events;
