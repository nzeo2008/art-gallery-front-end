import React from 'react';
import styles from './exhibition.card.module.css';
import CustomButton from './../../../components/Button/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import ru from 'date-fns/locale/ru';
import { api } from './../../../config';

function ExhibitionCard({ exhibition, user, handleDelete, handleUpdate }) {
	return (
		<div className={styles.card_container}>
			{user && user.isAdmin && (
				<div className={styles.delete_button_container}>
					<CustomButton
						handleClick={() => {
							handleDelete(exhibition._id);
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
							handleUpdate(exhibition._id);
						}}
					/>
				</div>
			)}
			<div className={styles.image_container}>
				<img src={api.baseUrl + exhibition.images[0]} alt={exhibition.alias} />
				<Link
					state={exhibition}
					className={styles.image_link}
					to={`../exhibitions/${exhibition.alias}`}
				></Link>
			</div>
			<span className={styles.card_date}>
				{format(parseISO(exhibition.startDate), 'dd MMMM, yyyy', { locale: ru }) +
					' - ' +
					exhibition.city}
			</span>
			<Link state={exhibition} to={`../exhibitions/${exhibition.alias}`}>
				<h3>{exhibition.title}</h3>
			</Link>
			<article className={styles.article}>{parse(exhibition.description)}</article>
		</div>
	);
}

export default ExhibitionCard;
