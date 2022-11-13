import React from 'react';
import styles from './event.card.module.css';
import { Link } from 'react-router-dom';
import CustomButton from '../../../components/Button/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';

function EventCard(props) {
	const { date, image, title, article, _id, alias, handleDeleteEvent, handleUpdate, user } =
		props;

	return (
		<div className={styles.container}>
			{user && user.isAdmin && (
				<div className={styles.delete_button_container}>
					<CustomButton
						handleClick={() => {
							handleDeleteEvent(_id);
						}}
						name='X'
						style={styles.delete_button}
					/>
				</div>
			)}
			{user && user.isAdmin && (
				<div className={styles.icon_container}>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faEllipsis}
						onClick={() => {
							handleUpdate(_id);
						}}
					/>
				</div>
			)}
			<Link to={`../events/${alias}`}>
				<div className={styles.image_container}>
					{image && <img src={image} alt={title} />}
				</div>
			</Link>
			<div className={styles.text_container}>
				<p>Создано: {date}</p>
				<Link to={`../events/${alias}`}>
					<h2>{title}</h2>
				</Link>
				<div className={styles.article_container}>
					<div className={styles.article}>{parse(article)}</div>
				</div>
				<Link to={`../events/${alias}`} className={styles.link}>
					Прочитать полностью
				</Link>
			</div>
		</div>
	);
}

export default EventCard;
