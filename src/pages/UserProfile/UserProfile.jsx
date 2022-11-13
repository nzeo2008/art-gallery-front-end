import React, { useEffect, useState } from 'react';
import { getData } from '../../services/admin.services';
import styles from './user.profile.module.css';
import { api } from './../../config';
import avatar from '../../images/default_avatar.jpg';
import { format, parseISO } from 'date-fns';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { scrollOnTop } from './../../services/common.service';

function UserProfile({ user }) {
	const [currentUser, setCurrentUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isClick, setIsClick] = useState(false);

	async function getUserData(email) {
		try {
			const { data } = await getData(api.getUserDataEndpoint, { email });
			setCurrentUser(data);
			setIsLoading(true);
		} catch (ex) {
			return;
		}
	}

	useEffect(() => {
		getUserData(user.email);
		scrollOnTop();
	}, []);

	return (
		<>
			{isLoading ? (
				<section className={styles.top_container}>
					<div className={styles.side_container}>
						<div className={styles.main_container}>
							<h2>Профиль</h2>
							<div className={styles.container}>
								<div className={styles.header_container}>
									<div className={styles.image_container}>
										<img src={avatar} alt={avatar} />
									</div>
									<div className={styles.text_info}>
										<div>
											<h3>Имя:</h3>
											<span>{currentUser.name}</span>
										</div>
										<div>
											<h3>Email:</h3>
											<span>{currentUser.email}</span>
										</div>
										<div>
											<h3>Дата регистрации:</h3>
											<span>
												{format(
													parseISO(currentUser.registerDate),
													'dd/MM/yyyy'
												)}
											</span>
										</div>
									</div>
								</div>
								<div className={styles.content_container}>
									<div className={styles.content_container_header}>
										<div
											className={styles.saved_events_container}
											onClick={() => {
												setIsClick(!isClick);
											}}
										>
											<FontAwesomeIcon
												icon={faPlay}
												className={isClick ? styles.icon_down : styles.icon}
											/>
											<span>Сохранённые события</span>
										</div>
										<ul
											className={
												isClick
													? styles.content_list_show
													: styles.content_list_none
											}
										>
											{currentUser.savedEvents.map((event) => {
												return (
													<li key={event.alias}>
														<Link
															to={`../events/${event.alias}`}
															className={styles.link}
														>
															{event.title}
														</Link>
													</li>
												);
											})}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}

export default UserProfile;
