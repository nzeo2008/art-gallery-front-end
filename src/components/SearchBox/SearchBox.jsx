import React from 'react';
import styles from './searchbox.module.css';
import Artist from './Artist';
import CustomButton from '../Button/CustomButton';

function SearchBox(props) {
	const {
		onClose,
		setConfirmData,
		selectedArtists,
		setSelectedArtists,
		state,
		setState,
		artists,
		setArtists,
		onCloseAndClear,
	} = props;

	function confirmData() {
		setConfirmData(selectedArtists);
		onClose();
	}

	function handleSearch(e) {
		const searchQuery = e.target.value;
		const res = state.filter((item) => {
			return item.name.toLowerCase().startsWith(searchQuery.toLowerCase());
		});
		setArtists(res);
		if (!searchQuery) {
			setArtists([]);
		}
	}

	function addArtist(index) {
		const updatedState = state.filter((artist) => {
			return artist._id !== artists[index]._id;
		});
		const updatedArtists = artists.filter((artist, stateIndex) => {
			return stateIndex !== index;
		});
		setSelectedArtists((prevArtists) => [...prevArtists, artists[index]]);
		setState(updatedState);
		setArtists(updatedArtists);
	}

	function deleteArtist(index) {
		const updatedSelectedArtists = selectedArtists.filter((selectedArtist) => {
			return selectedArtist._id !== selectedArtists[index]._id;
		});
		setState((prevArtists) => [...prevArtists, selectedArtists[index]]);
		setSelectedArtists(updatedSelectedArtists);
	}

	return (
		<div className={styles.shadow_box}>
			<div className={styles.top_container}>
				<div className={styles.container}>
					<div className={styles.searchbar_container}>
						<input
							type='search'
							onChange={(e) => {
								handleSearch(e);
							}}
							placeholder='Type artist name'
						/>
						<CustomButton
							handleClick={onCloseAndClear}
							style={styles.close_button}
							name='Close'
						/>
					</div>
					<div className={styles.data_container}>
						{artists.map((artist, index) => {
							return (
								<div
									key={artist.surname + artist.name + index}
									className={styles.artist_container}
								>
									<Artist onClick={addArtist} index={index} artist={artist} />
									<CustomButton
										name='+'
										handleClick={() => {
											addArtist(index);
										}}
										style={styles.add_button}
									/>
								</div>
							);
						})}
					</div>
					<CustomButton
						name='Confirm'
						style={styles.confirm_button}
						handleClick={confirmData}
					/>
				</div>
				<div className={styles.selected_data_container}>
					{selectedArtists.map((selectedArtist, index) => {
						return (
							<div
								key={selectedArtist.name + index}
								className={styles.selected_artist_container}
							>
								<Artist artist={selectedArtist} />
								<CustomButton
									name='-'
									handleClick={() => {
										deleteArtist(index);
									}}
									style={styles.remove_button}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default SearchBox;
