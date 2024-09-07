import React from 'react';

const NavBar = () => {
	return (
		<nav className="navbar">
			<div className="max-width">
				<div className="logo">
					<a href="/">
						Trip<span>Guide</span>
					</a>
				</div>
				<ul className="menu">
					<li>
						<a href="/" className="menu-btn">
							Home
						</a>
					</li>
					<li>
						<a href="/guide_me" className="menu-btn active">
							Guide ME
						</a>
					</li>
					<li>
						<a href="#about" className="menu-btn active">
							Our Vision
						</a>
					</li>
					{/* <li>
						<a href="#resigter" className="menu-btn active">
							Register
						</a>
					</li> */}
				</ul>
				<div className="menu-btn">
					<i className="fas fa-bars"></i>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
