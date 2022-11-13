import React from 'react';
import styles from './investmentsInfo.module.css';

function InvestmentsInfo() {
	return (
		<div className={styles.investments}>
			<div className={styles.investments_container}>
				<div className={styles.investments_header}>
					<h4>Мы инвестируем в современное искусство</h4>
				</div>
				<div className={styles.progress_bar_container}>
					<div className={styles.progress_bar}>
						<h6>Скульптуры</h6>
						<div className={styles.progress_bar_wrapper}>
							<div className={styles.grey_line}>
								<div className={styles.black_line_1}>
									<div className={styles.dot}>
										<div className={styles.number}>96%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.progress_bar}>
						<h6>Картины</h6>
						<div className={styles.progress_bar_wrapper}>
							<div className={styles.grey_line}>
								<div className={styles.black_line_2}>
									<div className={styles.dot}>
										<div className={styles.number}>82%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.progress_bar}>
						<h6>Живопись</h6>
						<div className={styles.progress_bar_wrapper}>
							<div className={styles.grey_line}>
								<div className={styles.black_line_3}>
									<div className={styles.dot}>
										<div className={styles.number}>90%</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InvestmentsInfo;
