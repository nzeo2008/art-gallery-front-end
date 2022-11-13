import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './aboutInfo.module.css';

function AboutInfo() {
	return (
		<div className={styles.about}>
			<div className={styles.about_container}>
				<div className={styles.about_info}>
					<div>
						<h5>
							Наша цель - удовлетворить потребности всех любителей искусства: от тех,
							кто ищет картину себе по душе, до серьезных коллекционеров,
							вкладывающихся в современное искусство.
						</h5>
					</div>
					<div>
						<p>
							Художественная галерея представляет переосмысленную миссию, видение и
							ценности, которые стремятся почтить наше прошлое, откликнуться на наше
							настоящее и вдохновить наше будущее с помощью общего языка. Мы
							приглашаем всех людей исследовать и приобщаться к искусству, творчеству
							и нашей общей человечности.
						</p>
					</div>
				</div>
				<div className={styles.about_card_container}>
					<div className={styles.about_card}>
						<FontAwesomeIcon icon={faIdCard} className={styles.svg} />
						<h3>5,731</h3>
						<h5>Успешных выставок</h5>
						<p>
							Успех наших выставок целиком зависит от нашей профессиональной комманды
							и наша команда добивается только лучших результатов
						</p>
						<Link to='/events' className={styles.link}>
							Узнать больше
							<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
						</Link>
					</div>
					<div className={styles.about_center_card}>
						<FontAwesomeIcon icon={faMap} className={styles.svg} />
						<h3>123</h3>
						<h5>Страны в которых мы были</h5>
						<p>
							Это только начало и мы не собираемся останавливаться на достигнутом пока
							не покорим весь земной шар
						</p>
						<Link to='/location' className={styles.link}>
							Узнать больше
							<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
						</Link>
					</div>
					<div className={styles.about_card}>
						<FontAwesomeIcon icon={faAward} className={styles.svg} />
						<h3>76</h3>
						<h5>Наград</h5>
						<p>
							Наши выставки признаются и отмечаются многими международными критиками и
							международными изданиями в области искусства
						</p>
						<Link to='/exhibitions' className={styles.link}>
							Узнать больше
							<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutInfo;
