import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './trippleCard.module.css';
import { scrollOnTop } from './../../../services/common.service';

function TrippleCard() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.info}>
					<h6>О нас</h6>
					<h2>Ведущая коллекция произведений искусства</h2>
					<p>
						Мы считаем приоритетом инвестировать в современное искусство и быть
						открытыми к новым талантам, благодаря такой политике удалось собрать большую
						коллекцию значение которой признаётся во всём мире.
					</p>
				</div>
				<div className={styles.card_wrapper}>
					<div className={styles.card}>
						<img src='images/TrippleCard-1.jpg' alt='TrippleCard-1.jpg' />
						<div className={styles.text}>
							<h6>Что мы делаем</h6>
							<p>Мы организуем выставки и открытые соревнования по всему миру.</p>
							<Link
								to={`../events`}
								onClick={() => {
									scrollOnTop();
								}}
								className={styles.link}
							>
								Узнать больше
								<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
							</Link>
						</div>
					</div>
					<div className={styles.middle_card}>
						<img src='images/TrippleCard-2.jpg' alt='TrippleCard-2.jpg' />
						<div className={styles.text}>
							<h6>Кому мы помогаем</h6>
							<p>Мы помогаем новым талантам представить своё творчество аудитории.</p>
							<Link
								to={`../exhibitions`}
								onClick={() => {
									scrollOnTop();
								}}
								className={styles.link}
							>
								Узнать больше
								<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
							</Link>
						</div>
					</div>
					<div className={styles.card}>
						<img src='images/TrippleCard-3.jpg' alt='TrippleCard-3.jpg' />
						<div className={styles.text}>
							<h6>Почему выбирают нас</h6>
							<p>
								Открытость и профессиональная команда, то что отличает нас от
								других.
							</p>
							<Link
								to={`../artists`}
								onClick={() => {
									scrollOnTop();
								}}
								className={styles.link}
							>
								Узнать больше
								<FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TrippleCard;
