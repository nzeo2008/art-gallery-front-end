import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './spinner.module.css';

function LoadingSpinner() {
	return (
		<div className={styles.spinner_container}>
			<FontAwesomeIcon icon={faSpinner} className={styles.icon} />
		</div>
	);
}

export default LoadingSpinner;
