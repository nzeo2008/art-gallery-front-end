import React, { useEffect } from 'react';
import ImagesSlider from './HomeSections/ImagesSlider';
import { scrollOnTop } from './../../services/common.service';
import TextSection from './HomeSections/TextSection';
import InfoSection from './HomeSections/InfoSection';
import TrendingSection from './HomeSections/TrendingSection';
import CuratorsSection from './HomeSections/CuratorsSection';
import EventsSection from './HomeSections/EventsSection';

function Home({ exhibitions, events }) {
	useEffect(() => {
		scrollOnTop();
	}, []);

	return (
		<>
			<ImagesSlider exhibitions={exhibitions} />
			<TextSection />
			<InfoSection />
			<TrendingSection exhibitions={exhibitions} />
			<CuratorsSection />
			<EventsSection events={events} />
		</>
	);
}

export default Home;
