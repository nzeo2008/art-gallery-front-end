import React from 'react';
import styles from './curators.section.module.css';
import first_curator_logo from '../../../images/Curators/first_curator.jpg';
import second_curator_logo from '../../../images/Curators/second_curator.jpg';
import third_curator_logo from '../../../images/Curators/third_curator.jpg';

function CuratorsSection() {
	return (
		<section className={styles.curators_cards_section}>
			<span> У нас работает </span>
			<h2>Профессиональная команда кураторов</h2>
			<p>
				Роль, которую играют кураторы, как и искусство, которым они занимаются, постоянно
				развивается. По мере того как меняется культура, двигаясь вместе с изменениями в
				социальном и политическом ландшафте или технологическими инновациями, меняется и
				создаваемое искусство.
			</p>
			<div className={styles.curators_container}>
				<div className={styles.curator_card}>
					<div className={styles.curatots_card_image_container}>
						<img src={first_curator_logo} alt={first_curator_logo} />
					</div>
					<span>Помощник куратора</span>
					<h2>Louis Toadvine</h2>
				</div>
				<div className={styles.curator_card}>
					<div className={styles.curatots_card_image_container}>
						<img src={second_curator_logo} alt={second_curator_logo} />
					</div>
					<span>Главный куратор</span>
					<h2>Oedipa Mass</h2>
				</div>
				<div className={styles.curator_card}>
					<div className={styles.curatots_card_image_container}>
						<img src={third_curator_logo} alt={third_curator_logo} />
						<div className={styles.card_shadow_box}></div>
					</div>
					<span>Приглашённый помощник</span>
					<h2>Tyrone Di Presso</h2>
				</div>
			</div>
		</section>
	);
}

export default CuratorsSection;
