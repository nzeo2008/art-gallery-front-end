import React from 'react';
import styles from './lost.content.module.css';

function LostContent() {
	return (
		<div className={styles.page_container}>
			<div className={styles.lost_content_container}>
				<img src='images/Lost.png' alt='search.png' />
				<h1>Произошла потеря контента!</h1>
				<h2>Мы уже работаем над этой проблемой...</h2>
			</div>
		</div>
	);
}

export default LostContent;
