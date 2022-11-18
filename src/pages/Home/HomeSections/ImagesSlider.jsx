import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../../config';
import styles from './images.slider.module.css';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function ImagesSlider({ exhibitions }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const timerIdRef = useRef();

	useEffect(() => {
		timerIdRef.current = setTimeout(() => {
			if (currentIndex === exhibitions.length - 1) {
				return setCurrentIndex(0);
			}
			setCurrentIndex(currentIndex + 1);
		}, 8000);

		return () => clearTimeout(timerIdRef.current);
	}, [currentIndex, exhibitions]);

	return exhibitions.length === 0 ? (
		<LoadingSpinner />
	) : (
		<section className={styles.all_pages}>
			{exhibitions.map((exhibition, index) => {
				return (
					<React.Fragment key={exhibition._id}>
						<div
							className={
								index === currentIndex
									? styles.image_container_show
									: styles.image_container
							}
						>
							<img src={api.baseUrl + exhibition.images[0]} alt='' />
						</div>
						<div
							className={
								index === currentIndex ? styles.text_area_show : styles.text_area
							}
						></div>
						{
							<div
								className={index === currentIndex ? styles.text_show : styles.text}
							>
								<h2>
									<Link to={`../exhibitions/${exhibition.alias}`}>
										{exhibition.title}
									</Link>
								</h2>
								<h3>{exhibition.city}</h3>
								<h3>
									{format(parseISO(exhibition.startDate), 'dd MMMM, yyyy', {
										locale: ru,
									}) +
										' - ' +
										format(parseISO(exhibition.endDate), 'dd MMMM, yyyy', {
											locale: ru,
										})}
								</h3>
							</div>
						}
					</React.Fragment>
				);
			})}
			<FontAwesomeIcon
				icon={faArrowLeft}
				onClick={() => {
					if (currentIndex === 0) return setCurrentIndex(exhibitions.length - 1);
					setCurrentIndex(currentIndex - 1);
					return () => clearTimeout(timerIdRef.current);
				}}
				className={styles.left_arrow}
			/>
			<FontAwesomeIcon
				icon={faArrowRight}
				onClick={() => {
					if (currentIndex === exhibitions.length - 1) return setCurrentIndex(0);
					setCurrentIndex(currentIndex + 1);
					return () => clearTimeout(timerIdRef.current);
				}}
				className={styles.right_arrow}
			/>
		</section>
	);
}

export default ImagesSlider;
