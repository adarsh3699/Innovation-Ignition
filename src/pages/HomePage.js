import React from 'react';

import HeroSection from '../components/heroSection/HeroSection';
import About from '../components/about/About';
import Creativity from '../components/creativity/creativity';
// import Countdown from '../components/countdown/Countdown';
import Footer from '../components/footer/FootBar';

function HomePage() {
	return (
		<div className="App">
			<div className="scroll-up-btn">
				<div className="fas fa-angle-up"></div>
			</div>
			{/* <!-- home section start --> */}
			<HeroSection />
			{/* <!-- about section start --> */}
			<About />
			{/* <!-- creativity section start --> */}
			<Creativity />

			<Footer />
		</div>
	);
}

export default HomePage;
