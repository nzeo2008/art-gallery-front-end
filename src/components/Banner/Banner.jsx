import React from 'react';
import styles from './banner.module.css';

function Banner({ imagePath, altName, from }) {
	return (
		<section className={styles.banner}>
			<img loading='lazy' src={imagePath} alt={altName} />
			<div className={styles.banner_card}>
				<div className={styles.banner_header}>
					<h1>{from}</h1>
				</div>
			</div>
		</section>
	);
}

export default Banner;
