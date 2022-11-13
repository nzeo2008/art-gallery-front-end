import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import LostContent from '../LostContent/LostContent';
import styles from './exhibition.module.css';
import { format, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { api } from './../../config';
import parse from 'html-react-parser';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faArrowLeft, faArrowRight, faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { scrollOnTop } from './../../services/common.service';

function Exhibition({ exhibitions }) {
	const { state: exhibition } = useLocation();
	const params = useParams();
	const navigate = useNavigate();

	const [index, setIndex] = useState(-1);

	const [exhibitionPage, setExhibitionPage] = useState({
		previousPage: '',
		currentPage: '',
		nextPage: '',
		previousIndex: 0,
		nextIndex: 0,
	});

	const [mainImage, setMainImage] = useState('');
	const [otherImages, setOtherImages] = useState('');

	useEffect(() => {
		if (exhibitions.length !== 0) {
			const resIndex = exhibitions.findIndex((item) => item.alias === params.alias);
			resIndex !== -1 ? setIndex(resIndex) : setIndex(-2);
		}
		if (exhibitions.length !== 0 && index >= 0) {
			setLocation(exhibitions, index);
			setMainImage(exhibitions[index].images[0]);
			setOtherImages(_.slice(exhibitions[index].images, 1, exhibitions[index].images.length));
			scrollOnTop();
		} else if (!exhibition && index === -2) {
			navigate('not-found', { replace: true });
		}
	}, [exhibitions, params, index]);

	function setLocation(exhibitions, index) {
		if (exhibitions && exhibitions.length !== 1) {
			if (index === 0) {
				return setExhibitionPage({
					previousPage: exhibitions[exhibitions.length - 1],
					currentPage: exhibitions[index],
					nextPage: exhibitions[index + 1],
					nextIndex: index + 1,
					previousIndex: exhibitions.length - 1,
				});
			} else if (index === exhibitions.length - 1) {
				return setExhibitionPage({
					previousPage: exhibitions[index - 1],
					currentPage: exhibitions[index],
					nextPage: exhibitions[0],
					nextIndex: 0,
					previousIndex: index - 1,
				});
			}
			return setExhibitionPage({
				previousPage: exhibitions[index - 1],
				currentPage: exhibitions[index],
				nextPage: exhibitions[index + 1],
				nextIndex: index + 1,
				previousIndex: index - 1,
			});
		}
	}

	return exhibitions.length !== 0 && index >= 0 ? (
		<main className={styles.main_container}>
			<section className={styles.header}>
				<Link to={`../category/exhibitions/${exhibitions[index].category}`}>
					{exhibitions[index].category}
				</Link>
				<h1>{exhibitions[index].title}</h1>
				<h2>{exhibitions[index].city}</h2>
				<span>
					{format(parseISO(exhibitions[index].startDate), 'dd MMMM, yyyy', {
						locale: ru,
					}) +
						' - ' +
						format(parseISO(exhibitions[index].endDate), 'dd MMMM, yyyy', {
							locale: ru,
						})}
				</span>
			</section>
			{mainImage && (
				<section className={styles.main_content}>
					<div className={styles.image_container}>
						<img src={api.baseUrl + mainImage} alt={exhibitions[index].alias} />
					</div>
					<article>{parse(exhibitions[index].description)}</article>
				</section>
			)}
			<section className={styles.artist_tags_section}>
				<div className={styles.tags}>
					<FontAwesomeIcon icon={faTags} className={styles.icon} />
					<span>Теги: </span>
					{exhibitions[index].tags.map((tag, index) => {
						return (
							<span key={tag + index}>
								{
									<Link to={`../tags/${tag}`} className={styles.tag}>
										{tag}
									</Link>
								}
								{' / '}
							</span>
						);
					})}
				</div>
				<div className={styles.artists_wrapper}>
					<h3>Принимающие участие в выставке:</h3>
					<div className={styles.artists}>
						{exhibitions[index].artists.map((artist) => {
							return (
								<div key={artist._id} className={styles.artist_container}>
									<div className={styles.avatar}>
										<img src={api.baseUrl + artist.avatar} alt={artist.name} />
										<Link
											to={`../../artists/${artist._id}`}
											className={styles.avatar_link}
										></Link>
									</div>
									<div className={styles.avatar_info}>
										{artist.name + ' ' + artist.surname}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			{otherImages && (
				<section className={styles.images_section}>
					{otherImages.map((image, index) => {
						return (
							<div key={image + index} className={styles.image_container}>
								<img src={api.baseUrl + image} alt={image} />
							</div>
						);
					})}
				</section>
			)}
			<section className={styles.navigation_section}>
				<div className={styles.left_arrow}>
					<Link
						className={styles.nav_link}
						to={`../${exhibitionPage.previousPage.alias}`}
						relative='path'
						state={exhibitionPage.previousPage}
					>
						<FontAwesomeIcon icon={faArrowLeft} className={styles.nav_icon} />
						<span>Предыдущая выставка</span>
					</Link>
				</div>
				<div className={styles.center}>
					<FontAwesomeIcon icon={faBorderNone} />
				</div>
				<div className={styles.right_arrow}>
					<Link
						className={styles.nav_link}
						to={`../${exhibitionPage.nextPage.alias}`}
						relative='path'
						state={exhibitionPage.nextPage}
					>
						<span>Следующая выставка</span>
						<FontAwesomeIcon icon={faArrowRight} className={styles.nav_icon} />
					</Link>
				</div>
			</section>
		</main>
	) : (
		<LostContent />
	);
}

export default Exhibition;
