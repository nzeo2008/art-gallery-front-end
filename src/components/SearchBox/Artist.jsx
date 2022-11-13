import React from 'react';
import styles from './artist.module.css';

function Artist(props) {
	const { artist, index } = props;

	return (
		<>
			<div key={index} className={styles.artist}>
				<div key={artist._id}>{artist.name}</div>
				<div key={index + artist.surname}>{artist.surname}</div>
			</div>
		</>
	);
}

export default Artist;
