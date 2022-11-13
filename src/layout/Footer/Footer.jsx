import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import logo from '../../images/footer-logo.png';
import styles from './footer.module.css';
import _ from 'lodash';
import EventsSection from './FooterSections/EventsSection';
import InfoSection from './FooterSections/InfoSection';

function Footer({ events }) {
	const [slicedEvents, setSlicedEvents] = useState([]);

	useEffect(() => {
		setSlicedEvents(_.slice(events, 0, 4));
	}, [events]);

	return (
		<div className={styles.footer}>
			<div className={styles.footer_container}>
				<div className={styles.general_info}>
					<img src={logo} alt='footer-logo' />
					<InfoSection
						firstParagraph='Кутузовский проспект, д.3'
						secondParagraph='Москва, Moscow 101'
						thirdParagraph='+7-913-xxx-xxxx'
						fourthPapagraph='art-gallery@gmail.com'
					/>
					<InfoSection
						firstParagraph='Музей: +7-913-xxx-xxxx'
						secondParagraph='Галерея: +7-913-xxx-xxxx'
						thirdParagraph='Бар: +7-913-xxx-xxxx'
						fourthPapagraph='Поддержка: +7-913-xxx-xxxx'
					/>
				</div>
				<section>
					<InfoSection
						header='Музей'
						firstParagraph='Пон 09:00 – 18:00'
						secondParagraph='Вт 09:00 – 18:00'
						thirdParagraph='Ср-Чт 09:00 – 18:00'
						fourthPapagraph='Пт 9:00 – 20:00'
						fifthParagraph='Сб-ВС 09:00 – 18:00'
					/>
					<InfoSection
						header='Галерея'
						firstParagraph='Пон 09:00 – 18:00'
						secondParagraph='Вт 09:00 – 18:00'
						thirdParagraph='Ср-Чт 09:00 – 18:00'
						fourthPapagraph='Пт 9:00 – 20:00'
						fifthParagraph='Сб-ВС 09:00 – 18:00'
					/>
				</section>
				<section>
					<InfoSection
						header='Поддержка'
						firstParagraph='Пон 09:00 – 18:00'
						secondParagraph='Вт 09:00 – 18:00'
						thirdParagraph='Ср-Чт 09:00 – 18:00'
						fourthPapagraph='Пт 9:00 – 20:00'
						fifthParagraph='Сб-ВС 09:00 – 18:00'
					/>
					<InfoSection
						header='Бар'
						firstParagraph='Пон 09:00 – 18:00'
						secondParagraph='Вт 09:00 – 18:00'
						thirdParagraph='Ср-Чт 09:00 – 18:00'
						fourthPapagraph='Пт 9:00 – 20:00'
						fifthParagraph='Сб-ВС 09:00 – 18:00'
					/>
				</section>
				<section className={styles.events_info}>
					<h5 className={styles.paragraph_header}>События</h5>
					<div className={styles.images_container}>
						{slicedEvents.map((randomEvent, index) => {
							return (
								<EventsSection
									events={events}
									index={index}
									key={randomEvent._id}
									title={randomEvent.title}
									image={randomEvent.images[0]}
								/>
							);
						})}
					</div>
				</section>
			</div>
			<div className={styles.rights_wrapper}>
				<div className={styles.rights_reserved}>Made by Andrey Kalinichenko</div>
				<div className={styles.rights_reserved}>
					© Art Gallery. Все права защищены 2018 - {format(new Date(), 'yyyy')}.
				</div>
			</div>
		</div>
	);
}

export default Footer;
