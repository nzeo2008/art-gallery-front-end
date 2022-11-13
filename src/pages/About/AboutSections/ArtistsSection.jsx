import React from 'react';
import Zhang from '../../../images/Artists/zhang-xiaogang.jpg';
import Arzhan from '../../../images/Artists/Arzhan.jpg';
import Ann from '../../../images/Artists/Ann.jpeg';
import Thomas from '../../../images/Artists/Thomas-Schütte.jpg';

import styles from './artistsSection.module.css';

function ArtistsSection() {
	return (
		<div className={styles.section_container}>
			<div>
				<h1>Мы работаем только с ЛУЧШИМИ деятелями искусства</h1>
			</div>
			<div className={styles.artists_image_container}>
				<div className={styles.image_container}>
					<img src={Zhang} alt='Zhang-Xiaogang.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Чжан Сяоган</h3>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src={Arzhan} alt='Arzhan-Yuteev.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Аржан Ютеев</h3>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src={Thomas} alt='Thomas-Schütte.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Томас Шютте</h3>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src={Ann} alt='Anna-Grazhdankina.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Анна Гражданкина</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArtistsSection;
