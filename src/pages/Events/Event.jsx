import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import styles from './event.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faArrowLeft,
	faBookmark as faBookmarkBlack,
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkWhite } from '@fortawesome/free-regular-svg-icons';
import { api } from './../../config';
import { scrollOnTop } from './../../services/common.service';
import { format, parseISO } from 'date-fns';
import LostContent from './../LostContent/LostContent';
import parse from 'html-react-parser';
import { createFormDataForEvents, getData, updateData } from '../../services/admin.services';
import { toastLoading, toastUpdate } from './../../services/toasts.service';

function Event({ events, user }) {
	const location = useLocation();

	const [changeIcon, setChangeIcon] = useState(false);

	const navigate = useNavigate();

	const params = useParams();

	const [index, setIndex] = useState(-1);

	const [eventPage, setEventPage] = useState({
		previousPage: '',
		currentPage: '',
		nextPage: '',
		previousIndex: 0,
		nextIndex: 0,
	});

	useEffect(() => {
		checkEvent(eventPage.currentPage.alias);
	}, [eventPage.currentPage]);

	useEffect(() => {
		if (events.length !== 0) {
			const resIndex = events.findIndex((item) => item.alias === params.alias);
			resIndex !== -1 ? setIndex(resIndex) : setIndex(-2);
		}
		if (events.length !== 0 && index >= 0) {
			setLocation(events, index);
			scrollOnTop();
		} else if (!location.state && index === -2) {
			navigate('not-found', { replace: true });
		}
	}, [index, events, params]);

	async function saveEvent(email, event) {
		const toastId = toastLoading();
		const array = [event];

		try {
			const data = await createFormDataForEvents({ email, array });
			await updateData(api.saveEventToUserEndpoint, data);
			setChangeIcon(true);
			toastUpdate(toastId, 'Успешно сохранено', 'success');
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				toastUpdate(toastId, 'Не удалось добавить', 'error');
			} else {
				toastUpdate(toastId, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	async function deleteEvent(email, alias) {
		const toastId = toastLoading();

		try {
			const formData = new FormData();
			formData.append('email', email);
			formData.append('alias', alias);
			await updateData(api.deleteEventFromUserEndpoint, formData);
			setChangeIcon(false);
			toastUpdate(toastId, 'Успешно удалено', 'success');
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				toastUpdate(toastId, 'Не удалось удалить', 'error');
			} else {
				toastUpdate(toastId, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	async function checkEvent(alias) {
		const result = await getData(api.searchEventFromUserEndpoint, { alias });
		if (!result.data) {
			return setChangeIcon(false);
		}
		return setChangeIcon(true);
	}

	function setLocation(events, index) {
		if (events && events.length !== 1) {
			if (index === 0) {
				return setEventPage({
					previousPage: events[events.length - 1],
					currentPage: events[index],
					nextPage: events[index + 1],
					nextIndex: index + 1,
					previousIndex: events.length - 1,
				});
			} else if (index === events.length - 1) {
				return setEventPage({
					previousPage: events[index - 1],
					currentPage: events[index],
					nextPage: events[0],
					nextIndex: 0,
					previousIndex: index - 1,
				});
			}
			return setEventPage({
				previousPage: events[index - 1],
				currentPage: events[index],
				nextPage: events[index + 1],
				nextIndex: index + 1,
				previousIndex: index - 1,
			});
		}
	}

	return events.length !== 0 && index >= 0 ? (
		<main className={styles.top_container}>
			<section className={styles.side_container}>
				<div className={styles.event_container}>
					<Link
						to={`../category/events/${events[index].category}`}
						className={styles.category_link}
					>
						{events[index].category}
					</Link>
					{user && (
						<div className={styles.bookmark_icon_container}>
							<FontAwesomeIcon
								icon={changeIcon ? faBookmarkBlack : faBookmarkWhite}
								className={styles.icon}
								onClick={() => {
									if (!changeIcon) {
										return saveEvent(user.email, events[index]);
									}
									return deleteEvent(user.email, events[index].alias);
								}}
							/>
						</div>
					)}
					<h1>{events[index].title}</h1>
					<p className={styles.date}>
						{format(parseISO(events[index].createdAt), 'dd/MM/yyyy')}
					</p>
					{events[index].images.length !== 0 && (
						<img src={api.baseUrl + events[index].images} alt={events[index].title} />
					)}
					<div className={styles.text_section}>{parse(events[index].article)}</div>
					<div className={styles.arrow_container}>
						{events && events.length !== 1 && (
							<Link
								to={`../${eventPage.previousPage.alias}`}
								state={{ index: eventPage.previousIndex, events }}
								replace={true}
								relative='path'
								onClick={() => {
									setIndex(eventPage.previousIndex);
								}}
								className={styles.next_section_link}
							>
								<FontAwesomeIcon icon={faArrowLeft} className={styles.arrow} />
								<div className={styles.left_text}>
									<p>Предыдущее событие</p>
									<h6>{eventPage.previousPage.title}</h6>
								</div>
							</Link>
						)}
						{events && events.length !== 1 && (
							<Link
								to={`../${eventPage.nextPage.alias}`}
								state={{ index: eventPage.nextIndex, events }}
								onClick={() => {
									setIndex(eventPage.nextIndex);
								}}
								relative='path'
								replace={true}
								className={styles.next_section_link}
							>
								<div className={styles.right_text}>
									<p>Следующее событие</p>
									<h6>{eventPage.nextPage.title}</h6>
								</div>
								<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
							</Link>
						)}
					</div>
				</div>
			</section>
		</main>
	) : (
		<LostContent />
	);
}

export default Event;
