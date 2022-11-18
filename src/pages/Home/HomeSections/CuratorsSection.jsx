import React from 'react';
import styles from './curators.section.module.css';

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
						<img src='images/Curators/first_curator.jpg' alt='first_curator.jpg' />
					</div>
					<span>Помощник куратора</span>
					<h2>Антон Беляев</h2>
				</div>
				<div className={styles.curator_card}>
					<div className={styles.curatots_card_image_container}>
						<img src='images/Curators/second_curator.jpg' alt='second_curator.jpg' />
					</div>
					<span>Главный куратор</span>
					<h2>Олеся Мазур</h2>
				</div>
				<div className={styles.curator_card}>
					<div className={styles.curatots_card_image_container}>
						<img src='images/Curators/third_curator.jpg' alt='third_curator.jpg' />
						<div className={styles.card_shadow_box}></div>
					</div>
					<span>Приглашённый помощник</span>
					<h2>Тайрон Ди Прессо</h2>
				</div>
			</div>
		</section>
	);
}

export default CuratorsSection;
