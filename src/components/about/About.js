import React from 'react';

import aboutImage from '../../images/logo.jpg';

const About = () => {
	return (
		<section className="about" id="about">
			<div className="max-width">
				<h2 className="title">Our Vision</h2>
				<div className="about-content">
					<div className="column left">
						<img src={aboutImage} alt="" />
					</div>
					<div className="column right">
						{/* <div className="text">BharatPe's cofounder and MD Ashneer Grover</div> */}
						<p>
							Our online trip guide website is dedicated to providing users with an immersive and
							informative experience when it comes to exploring historical locations and monuments. By
							leveraging GPS data in real-time, the site will be able to provide users with up-to-date
							information and context about the sites they visit, enhancing their understanding and
							appreciation of the location's history and significance.
						</p>
						<br />
						<p>
							The site will feature detailed historical information, interactive maps, and audio-visual
							content to help users feel as if they are transported back in time. It will be the ultimate
							resource for history buffs and curious travelers alike!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
