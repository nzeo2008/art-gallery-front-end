import React from 'react';
import styles from './artist.card.module.css';
import CustomButton from './../../../components/Button/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { scrollOnTop } from './../../../services/common.service';
import { api } from './../../../config';
import defaultAvatar from '../../../images/default_avatar.jpg';

function ArtistCard({ lastArtistRef, user, handleDelete, handleUpdate, artist }) {
	return (
		<div ref={lastArtistRef} className={styles.avatar_container} key={artist._id}>
			{user && user.isAdmin && (
				<div className={styles.delete_button_container}>
					<CustomButton
						handleClick={() => {
							handleDelete(artist._id);
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
							handleUpdate(artist._id);
						}}
					/>
				</div>
			)}
			<Link
				to={`../artists/${artist._id}`}
				className={styles.link}
				onClick={() => {
					scrollOnTop();
				}}
				state={artist}
			>
				<img
					src={artist.avatar ? api.baseUrl + artist.avatar : defaultAvatar}
					loading='lazy'
					alt=''
				/>
				<div className={styles.text_info}>
					<h3>{artist.name + ' ' + artist.surname}</h3>
					{artist.nickname && <h3>{`(${artist.nickname})`}</h3>}
					<div className={styles.category}>
						<p>{artist.category}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ArtistCard;
