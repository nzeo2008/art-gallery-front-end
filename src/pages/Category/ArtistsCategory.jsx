import React, { useState, useEffect } from 'react';
import styles from './category.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../../services/admin.services';
import { api } from './../../config';
import { scrollOnTop } from './../../services/common.service';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import ArtistCard from '../Artists/ArtistsSections/ArtistCard';
import Banner from './../../components/Banner/Banner';

function ArtistsCategory() {
	const [artists, setArtists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const params = useParams();
	const navigate = useNavigate();

	async function fetchData() {
		const { data } = await getData(api.searchArtistCategoryEndpoint, {
			category: params.category,
		});

		if (data.length === 0) return navigate('not-found');

		setArtists(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchData();
		scrollOnTop();
	}, [params]);

	return (
		<>
			<Banner
				from={params.category}
				imagePath='/images/Free-image-1.jpg'
				altName='Free-image-1.jpg'
			/>
			{!isLoading ? (
				<section className={styles.cards_container}>
					{artists.map((artist) => {
						return <ArtistCard key={artist._id} artist={artist} />;
					})}
				</section>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}

export default ArtistsCategory;
