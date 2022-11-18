import React, { useState, useEffect, useCallback } from 'react';
import styles from './tags.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { scrollOnTop } from './../../services/common.service';
import { getData } from '../../services/admin.services';
import { api } from './../../config';
import ArtistCard from '../Artists/ArtistsSections/ArtistCard';
import ExhibitionCard from './../Exhibitions/ExhibitionsSections/ExhibitionCard';
import Banner from './../../components/Banner/Banner';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Tags() {
	const params = useParams();
	const [exhibitions, setExhibitions] = useState([]);
	const [artists, setArtists] = useState([]);
	const [isArtistsLoading, setIsArtistsLoading] = useState(true);
	const [isExhibitionsLoading, setIsExhibitionsLoading] = useState(true);
	const navigate = useNavigate();

	const fetchArtists = useCallback(async () => {
		const { data } = await getData(api.searchArtistTagsEndpoint, { tags: params.tags });

		setArtists(data);
		setIsArtistsLoading(false);
	}, [params]);

	const fetchExhibitions = useCallback(async () => {
		const { data } = await getData(api.searchExhibitionTagsEndpoint, { tags: params.tags });

		setExhibitions(data);
		setIsExhibitionsLoading(false);
	}, [params]);

	useEffect(() => {
		fetchExhibitions();
		fetchArtists();

		if (
			!isArtistsLoading &&
			!isExhibitionsLoading &&
			artists.length === 0 &&
			exhibitions.length === 0
		) {
			return navigate('not-found', { replace: true });
		}
		scrollOnTop();
	}, [fetchArtists, fetchExhibitions]);

	return (
		<>
			<Banner from={params.tags} imagePath='/images/Free-image-1.jpg' altName={params.tags} />
			{!isArtistsLoading && !isExhibitionsLoading ? (
				<section className={styles.main_container}>
					<section className={styles.container}>
						<h2>Деятели искусств:</h2>
						<div className={styles.cards_container}>
							{artists.length !== 0 ? (
								artists.map((artist) => {
									return <ArtistCard key={artist._id} artist={artist} />;
								})
							) : (
								<h3 className={styles.result}>К сожалению ничего не найдено...</h3>
							)}
						</div>
					</section>
					<section className={styles.container}>
						<h2>Проводимыe выставки:</h2>
						<div className={styles.cards_container}>
							{exhibitions.length !== 0 ? (
								exhibitions.map((exhibition) => {
									return (
										<ExhibitionCard
											key={exhibition.alias}
											exhibition={exhibition}
										/>
									);
								})
							) : (
								<h3 className={styles.result}>К сожалению ничего не найдено...</h3>
							)}
						</div>
					</section>
				</section>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}

export default Tags;
