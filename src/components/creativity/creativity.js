import React from 'react';

import Eatables from '../../images/Eatables.jpg';
import More_facts from '../../images/More_facts.jpg';
import Soveirners from '../../images/Soveirners.jpg';
import More_places_to_visit from '../../images/More_places_to_visit.jpg';
import Keep_in_mind from '../../images/Keep_in_mind.jpg';

function Creativity() {
	return (
		<section className="creativity" id="creativity">
			<div className="max-width">
				<div className="section_2_title">
					<div className="section_2_but">But,</div>
					<div>Why should you become a Mindful Marketer?</div>
				</div>
				<div className="serv-content">
					<div className="card" style={{ background: `url(${Eatables})` }}>
						<div className="box">
							<b>Eatables</b>
						</div>
					</div>
					<div className="card" style={{ background: `url(${Soveirners})` }}>
						<div className="box">
							<b>Soveirners</b>
						</div>
					</div>
					<div className="card" style={{ background: `url(${Keep_in_mind})` }}>
						<div className="box">
							<b>Understand time-tested principles</b>
						</div>
					</div>
					<div className="card" style={{ background: `url(${More_facts})` }}>
						<div className="box">
							<b>More facts</b>
						</div>
					</div>
					<div className="card" style={{ background: `url(${More_places_to_visit})` }}>
						<div className="box">
							<b>Keep in mind</b>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Creativity;
