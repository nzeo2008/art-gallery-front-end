import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import aboutLogo from '../../images/About-Banner.jpg';
import AboutInfo from './AboutSections/AboutInfo';
import InvestmentsInfo from './AboutSections/InvestmentsInfo';
import ArtistsSection from './AboutSections/ArtistsSection';
import TrippleCard from './AboutSections/TrippleCard';
import { scrollOnTop } from './../../services/common.service';

function About() {
	useEffect(() => {
		scrollOnTop();
	}, []);

	return (
		<>
			<Banner imagePath={aboutLogo} altName='about-banner.jpg' from='О нас' />
			<AboutInfo />
			<ArtistsSection />
			<InvestmentsInfo />
			<TrippleCard />
		</>
	);
}

export default About;
