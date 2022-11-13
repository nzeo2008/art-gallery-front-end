import React from 'react';
import styles from './info.section.module.css';
import location_logo from '../../../images/Location-Banner.jpg';
import aboutus_logo from '../../../images/Events-Banner.jpg';
import { Link } from 'react-router-dom';

function InfoSection() {
	return (
		<section className={styles.info_section}>
			<div className={styles.images_container}>
				<div className={styles.image_container}>
					<img src={location_logo} alt={location_logo} />

					<div className={styles.shadow_box}> </div>
					<div className={styles.text_image_container}>
						<span>Посети нашу уникальную галерею</span>
						<Link to='location'>Где мы находимся</Link>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src={aboutus_logo} alt={aboutus_logo} />
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
