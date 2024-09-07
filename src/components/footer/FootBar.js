import React from "react";

import logoImg from "../../images/logoSizeM.webp";

import "./footer.css";

function FootBar() {
	return (
		<div id="bottomBar">
			<img className="footerLogo" src={logoImg} alt="" />
			<div>© 2024-28 (V 1.0)</div>
			<div>Developed by Innovation Ignation</div>
		</div>
	);
}

export default FootBar;
