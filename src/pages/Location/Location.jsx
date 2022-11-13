import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import bannerLogo from '../../images/Free-image-3.jpg';
import locationInfoLogo from '../../images/Art-rafiki.png';
import styles from './location.module.css';
import { scrollOnTop } from './../../services/common.service';

function Location() {
	useEffect(() => {
		scrollOnTop();
	}, []);

	return (
		<div className={styles.location}>
			<Banner imagePath={bannerLogo} from='Где мы находимся' altName='Location-Banner.jpg' />
			<div className={styles.container}>
				<h1>Посети нашу уникальную галерею</h1>
				<div className={styles.cards}>
					<Card
						officeLocation='Московский офис'
						officeAdress='Кутузовский пр-кт, д.3, Москва, Россия'
						officeTelephone='+7-913-xxx-xxxx'
						officeEmail='information@office.com'
					/>
					<Card
						officeLocation='Казанский офис'
						officeAdress='пр-кт Ленина, д.17, Казань, Россия'
						officeTelephone='+7-913-xxx-xxxx'
						officeEmail='information@office.com'
					/>
					<Card
						officeLocation='Новосибирский офис'
						officeAdress='пр-кт Карла-Маркса, д.23, Новосибирск, Россия'
						officeTelephone='+7-913-xxx-xxxx'
						officeEmail='information@office.com'
					/>
					<Card
						officeLocation='Томский офис'
						officeAdress='ул. Большая Подгорная, д. 84, Томск, Россия'
						officeTelephone='+7-913-xxx-xxxx'
						officeEmail='information@office.com'
					/>
				</div>
			</div>
			<div className={styles.location_info}>
				<div className={styles.location_info_image}>
					<img src={locationInfoLogo} alt='Art-rafiki.png' />
				</div>
				<div className={styles.location_info_container}>
					<div className={styles.contacts_info}>
						<h6>Будь с нами!</h6>
						<strong>Выбор лучших критиков страны</strong>
					</div>
					<div className={styles.contacts_info_mobile}>
						<h6>Оставайся с нами на связи</h6>
						<h3>Свяжись с нашей командой поддержки чтобы узнать больше!</h3>
					</div>
					<p>
						Художественная галерея организует выставочные мероприятия и открытые
						соревнования с награждением победителей ценными художественными наградами.
						Проведение ежегодныеъх открытых соревнований, ежедневных выставок и шоу,
						позволяют начинающим художникам представить своё творчество аудитории.
					</p>
					<ul>
						<li>Галерея года</li>
						<li>Международные награды в области искусства</li>
						<li>Выбор наших посетителей</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Location;
