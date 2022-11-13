import React, { useEffect, useState, useRef, useCallback } from 'react';
import bannerLogo from '../../images/Artists-2.jpg';
import Banner from '../../components/Banner/Banner';
import styles from './artists.module.css';
import { api } from './../../config';
import { useNavigate } from 'react-router-dom';

import { toastLoading, toastUpdate } from './../../services/toasts.service';
import { deleteData } from '../../services/admin.services';
import { scrollOnTop } from '../../services/common.service';
import _ from 'lodash';
import ArtistCard from './ArtistsSections/ArtistCard';

function Artists({ artists, user, setArtists }) {
	const navigate = useNavigate();

	const [selectedArtists, setSelectedArtists] = useState([]);
	const pageLimit = 3;
	const [hasSearchQuery, setHasSearchQuery] = useState(false);
	const [endIndex, setEndIndex] = useState(pageLimit);
	const observer = useRef();

	const lastArtistRef = useCallback(
		(node) => {
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((enteries) => {
				if (enteries[0].isIntersecting && !hasSearchQuery) {
					setSelectedArtists((prevState) => [
						...prevState,
						..._.slice(artists, endIndex, endIndex + pageLimit),
					]);
					setEndIndex(pageLimit + endIndex);
				}
			});
			if (node) observer.current.observe(node);
		},
		[endIndex, artists, hasSearchQuery]
	);

	function handleUpdate(_id) {
		const [artist] = artists.filter((artist) => {
			return artist._id === _id;
		});
		const data = { data: artist, isUpdate: true, from: 'artist' };
		navigate('/admin', { state: data });
	}

	useEffect(() => {
		setSelectedArtists(_.slice(artists, 0, pageLimit));
		scrollOnTop();
	}, [artists]);

	function handleSearch(e) {
		const searchQuery = e.target.value;

		const res = artists.filter((item) => {
			return item.name.toLowerCase().startsWith(searchQuery.toLowerCase());
		});
		setSelectedArtists(res);
		if (!searchQuery) {
			setSelectedArtists(_.slice(artists, 0, pageLimit));
			setEndIndex(pageLimit);
		}
	}

	async function handleDelete(_id) {
		const toastId = toastLoading();
		const updatedArtists = artists.filter((artist) => {
			return artist._id !== _id;
		});
		try {
			setArtists(updatedArtists);
			await deleteData(api.deleteArtistEndpoint, { _id });
			toastUpdate(toastId, 'Успешно удалено', 'success');
		} catch (ex) {
			if (ex.response && ex.response.status >= 400 && ex.response.status <= 499) {
				setArtists(artists);
				toastUpdate(toastId, 'Деятеля искусства не удалось удалить', 'error');
			} else {
				setArtists(artists);
				toastUpdate(toastId, 'Произошла непредвиденная ошибка', 'error');
			}
		}
	}

	return (
		<main>
			<Banner imagePath={bannerLogo} from='Деятели искусства' altName='Location-Banner.jpg' />
			<section className={styles.section_container}>
				<div className={styles.searchbar_container}>
					<input
						type='search'
						placeholder='Введите имя'
						className={styles.searchbar}
						onChange={(e) => {
							handleSearch(e);
							if (e.target.value && e.target.value !== '') {
								return setHasSearchQuery(true);
							}
							setHasSearchQuery(false);
						}}
					/>
				</div>
				{
					<div className={styles.artist_container}>
						{selectedArtists.length !== 0 ? (
							selectedArtists.map((artist, index) => {
								if (selectedArtists.length === index + 1) {
									return (
										<ArtistCard
											key={artist._id}
											lastArtistRef={lastArtistRef}
											user={user}
											handleDelete={handleDelete}
											handleUpdate={handleUpdate}
											artist={artist}
										/>
									);
								} else
									return (
										<ArtistCard
											key={artist._id}
											user={user}
											handleDelete={handleDelete}
											handleUpdate={handleUpdate}
											artist={artist}
										/>
									);
							})
						) : (
							<h1>Ничего не найдено...</h1>
						)}
					</div>
				}
			</section>
		</main>
	);
}

export default Artists;
