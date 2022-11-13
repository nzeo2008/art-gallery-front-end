import React from 'react';
import styles from './image.zoom.module.css';

function ImageZoom({ imageUrl, setShowModal }) {
	return (
		<div
			className={styles.shadow_box}
			onClick={() => {
				setShowModal(false);
			}}
		>
			<div className={styles.image_container}>
				<img src={imageUrl} alt={imageUrl} />
			</div>
		</div>
	);
}

export default ImageZoom;
