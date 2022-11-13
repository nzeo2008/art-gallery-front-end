import React, { useEffect, useState, useRef } from 'react';
import styles from './artist.module.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { scrollOnTop } from './../../services/common.service';
import LostContent from '../LostContent/LostContent';
import { api } from './../../config';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import ImageZoom from '../../components/ImageZoom/ImageZoom';
import CustomButton from '../../components/Button/CustomButton';
import defaultAvatar from '../../images/default_avatar.jpg';

function Artist({ artists }) {
	const location = useLocation();

	const navigate = useNavigate();

	const [index, setIndex] = useState(-1);
	const [artist, setArtist] = useState('');
	const [showModal, setShowModal] = useState(false);

	const imageRef = useRef('');

	const params = useParams();

	useEffect(() => {
		if (artists.length !== 0) {
			const resIndex = artists.findIndex((artist) => artist._id === params._id);

			if (resIndex !== -1) {
				setArtist(artists[resIndex]);
				scrollOnTop();
			} else {
				setIndex(-2);
			}
		}
		if (!location.state && index === -2) {
			navigate('not-found', { replace: true });
		}
	}, [artists, params]);

	return artists.length !== 0 && artist ? (
		<main className={styles.main_container}>
			<section className={styles.section_container}>
				<div className={styles.artist_container}>
					<div className={styles.category}>
						<Link to={`../category/artists/${artist.category}`}>{artist.category}</Link>
					</div>
					<div className={styles.header}>
						<div className={styles.avatar_container}>
							<img
								loading='lazy'
								src={artist.avatar ? api.baseUrl + artist.avatar : defaultAvatar}
								alt={artist.name}
							/>
						</div>
						<div>
							<h1>{artist.name + ' ' + artist.surname}</h1>
							{artist.nickname && <h1>{`(${artist.nickname})`}</h1>}
						</div>
					</div>
					<div className={styles.artworks_header}>
						<h2>Биография</h2>
					</div>
					<article className={styles.article}>{parse(artist.bio)}</article>
					{artist.images.length !== 0 && (
						<div className={styles.artworks_header}>
							<h2>Работы автора</h2>
						</div>
					)}
					{showModal && (
						<ImageZoom imageUrl={imageRef.current} setShowModal={setShowModal} />
					)}
					<div className={styles.images_container}>
						{artist.images.map((image, index) => {
							return (
								<div key={image + index} className={styles.image_container}>
									<img
										onClick={() => {
											imageRef.current = api.baseUrl + image;
											setShowModal(true);
										}}
										loading='lazy'
										src={api.baseUrl + image}
										alt={api.baseUrl + image}
									/>
								</div>
							);
						})}
					</div>
					<div className={styles.tags}>
						<FontAwesomeIcon icon={faTags} className={styles.icon} />
						<span>Теги: </span>
						{artist.tags.map((tag, index) => {
							return (
								<span key={tag + index}>
									<Link to={`../tags/${tag}`} className={styles.tags_link}>
										{tag}
									</Link>
									{' / '}
								</span>
							);
						})}
					</div>
					<div className={styles.button_section}>
						<CustomButton
							style={styles.button}
							name='Вернуться назад'
							handleClick={() => {
								return navigate('/artists');
							}}
						/>
					</div>
				</div>
			</section>
		</main>
	) : (
		<LostContent />
	);
}

export default Artist;
