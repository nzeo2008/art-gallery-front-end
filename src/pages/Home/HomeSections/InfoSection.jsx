import React from 'react';
import styles from './info.section.module.css';
import { Link } from 'react-router-dom';

function InfoSection() {
	return (
		<section className={styles.info_section}>
			<div className={styles.images_container}>
				<div className={styles.image_container}>
					<img src='images/Location-Banner.jpg' alt='Location-Banner.jpg' />

					<div className={styles.shadow_box}> </div>
					<div className={styles.text_image_container}>
						<span>Посети нашу уникальную галерею</span>
						<Link to='location'>Где мы находимся</Link>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src='images/Events-Banner.jpg' alt='Events-Banner.jpg' />
					<div className={styles.shadow_box}></div>
					<div className={styles.text_image_container}>
						<span>Узнай о нас больше</span>
						<Link to='about'>О нас</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default InfoSection;
