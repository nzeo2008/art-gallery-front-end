import React from 'react';
import { format, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';
import parse from 'html-react-parser';
import styles from './trending.section.module.css';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingSpinner from './../../LoadingSpinner/LoadingSpinner';

function TrendingSection({ exhibitions }) {
	return exhibitions.length === 0 ? (
		<LoadingSpinner />
	) : (
		<section className={styles.trending_section}>
			<div className={styles.logo_image_container}>
				<img src='images/trending.jpg' alt='trending.jpg' />
			</div>
			<div className={styles.wrapper}>
				<h2>Будущие выставки</h2>
				<div className={styles.trending_exhibition_main_container}>
					<div className={styles.trending_exhibitions_container}>
						{_.slice(exhibitions, 0, 3).map((exhibition) => {
							return (
								<div key={exhibition.alias} className={styles.trending_exhibition}>
									<p>
										{format(parseISO(exhibition.startDate), 'LLL dd', {
											locale: ru,
										})}
									</p>
									<div className={styles.trending_text}>
										<Link to={`../exhibitions/${exhibition.alias}`}>
											{exhibition.title}
										</Link>
										<div>{parse(exhibition.description)}</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className={styles.trending_exhibitions_container}>
						{_.slice(exhibitions, 3, 6).map((exhibition) => {
							return (
								<div key={exhibition._id} className={styles.trending_exhibition}>
									<p>
										{format(parseISO(exhibition.startDate), 'LLL dd', {
											locale: ru,
										})}
									</p>
									<div className={styles.trending_text}>
										<Link to={`../exhibitions/${exhibition.alias}`}>
											{exhibition.title}
										</Link>
										<div>{parse(exhibition.description)}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className={styles.link_wrapper}>
				<Link to='exhibitions'>Смотреть все выставки</Link>
			</div>
		</section>
	);
}

export default TrendingSection;
