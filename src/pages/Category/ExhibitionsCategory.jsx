import React, { useState, useEffect } from 'react';
import styles from './category.module.css';
import Banner from './../../components/Banner/Banner';
import { getData } from '../../services/admin.services';
import { api } from './../../config';
import { useParams, useNavigate } from 'react-router-dom';
import { scrollOnTop } from './../../services/common.service';
import ExhibitionCard from '../Exhibitions/ExhibitionsSections/ExhibitionCard';
import LoadingSpinner from './../LoadingSpinner/LoadingSpinner';
import logo from '../../images/Free-image-1.jpg';

function Category() {
	const [exhibitions, setExhibitions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const params = useParams();
	const navigate = useNavigate();

	async function fetchData() {
		const { data } = await getData(api.searchExhibitionCategoryEndpoint, {
			category: params.category,
		});

		if (data.length === 0) return navigate('not-found');

		setExhibitions(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchData();
		scrollOnTop();
	}, [params]);

	return (
		<>
			<Banner from={params.category} imagePath={logo} altName={params.category} />
			{!isLoading ? (
				<section className={styles.cards_container}>
					{exhibitions.map((exhibition) => {
						return <ExhibitionCard key={exhibition.alias} exhibition={exhibition} />;
					})}
				</section>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}

export default Category;
