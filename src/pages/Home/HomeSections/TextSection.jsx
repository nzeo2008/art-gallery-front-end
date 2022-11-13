import React from 'react';
import styles from './text.section.module.css';

function TextSection() {
	return (
		<section className={styles.text_section}>
			<div className={styles.text_container}>
				<h2>
					Художественная галерея представляет собой уникальное место, позволяющее своим
					посетителям окунуться в интерпретацию современных событий и событий прошлого
					через их переосмысление современными деятелями искусства.
				</h2>
			</div>
		</section>
	);
}

export default TextSection;
