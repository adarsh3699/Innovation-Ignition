import React, { useCallback, useState } from "react";

const NavBar = () => {
	const [showMenu, setShowMenu] = useState(false);

	const handleMenu = useCallback(() => {
		setShowMenu(!showMenu);
	}, [showMenu]);

	return (
		<nav className="navbar">
			<div className="max-width">
				<div className="logo">
					<a href="/">
						Trip<span>Guide</span>
					</a>
				</div>
				<ul className={showMenu ? "menu active" : "menu"}>
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
						<a href="/#about" className="menu-btn active" onClick={handleMenu}>
							Our Vision
						</a>
					</li>
					{/* <li>
						<a href="#resigter" className="menu-btn active">
							Register
						</a>
					</li> */}
				</ul>
				<div className="menu-btn" onClick={handleMenu}>
					<i className="fas fa-bars"></i>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
