import React from 'react';
import styles from './artistsSection.module.css';

function ArtistsSection() {
	return (
		<div className={styles.section_container}>
			<div>
				<h1>Мы работаем только с ЛУЧШИМИ деятелями искусства</h1>
			</div>
			<div className={styles.artists_image_container}>
				<div className={styles.image_container}>
					<img src='images/Artists/zhang-xiaogang.jpg' alt='Zhang-Xiaogang.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Чжан Сяоган</h3>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src='images/Artists/Arzhan.jpg' alt='Arzhan-Yuteev.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Аржан Ютеев</h3>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src='images/Artists/Thomas-Schütte.jpg' alt='Thomas-Schütte.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Томас Шютте</h3>
					</div>
				</div>
				<div className={styles.image_container}>
					<img src='images/Artists/Ann.jpeg' alt='Anna-Grazhdankina.jpg' />
					<div className={styles.image_hidden_text}>
						<h3>Анна Гражданкина</h3>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArtistsSection;
