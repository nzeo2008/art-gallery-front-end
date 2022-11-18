import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notFound.module.css';

function NotFound() {
	return (
		<div className={styles.not_found_container}>
			<img src='images/404page.png' alt='404page.png' className={styles.not_found_image} />
			<div className={styles.container_wrapper}>
				<h2 className={styles.not_found_header}>Что-то пошло не так.</h2>
				<p className={styles.not_found_paragraph}>
					Мы не смогли найти страницу которую вы запрашиваете.
				</p>
				<Link to='/'>
					<button className={styles.not_found_button}>Обратно на главную</button>
				</Link>
			</div>
		</div>
	);
}

export default NotFound;
