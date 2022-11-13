import React from 'react';
import styles from './card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

function Card({ officeLocation, officeAdress, officeTelephone, officeEmail }) {
	return (
		<div className={styles.card_container}>
			<h3>{officeLocation}</h3>
			<div className={styles.card_text}>
				<FontAwesomeIcon icon={faAddressCard} />
				<p>{officeAdress}</p>
			</div>
			<div className={styles.card_text}>
				<FontAwesomeIcon icon={faPhone} />
				<p>{officeTelephone}</p>
			</div>
			<div className={styles.card_text}>
				<FontAwesomeIcon icon={faEnvelope} />
				<p>{officeEmail}</p>
			</div>
		</div>
	);
}

export default Card;
