import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.header_container}>
				<div className={styles.top_header}>
					<p className={styles.open_daily}>
						Ежедневно с 09:00 до 18:00, <span>Пятница до 20:00</span>
					</p>
					<div className={styles.top_header_nav_links}>
						<Link to='location' className={styles.nav_link}>
							Где мы находимся
						</Link>
						<Link to='about' className={styles.nav_link}>
							О нас
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
