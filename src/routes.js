import React, { Suspense, lazy } from "react";
import { Navigate, Routes as Switch, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/FootBar";

import "./styles/app.css";

// import LoginPage from './pages/LoginPage';
// import HomePage from "./pages/HomePage";
// import NotesPage from "./pages/NotesPage"
// import CreateAcc from "./pages/CreateAcc";

const HomePage = lazy(() => import("./pages/HomePage"));
const GuideMe = lazy(() => import("./pages/GuideMe"));

function Routes() {
	return (
		<Suspense
			fallback={
				<div id="loadingScreen">
					Loading
					<Loader isLoading={true} sx={{ marginTop: "10px" }} />
				</div>
			}
		>
			<Switch>
				<Route
					exact
					path="/"
					element={
						<>
							<NavBar />
							<HomePage />
							<Footer />
						</>
					}
				/>
				<Route
					exact
					path="/guide_me"
					element={
						<>
							<NavBar />
							<GuideMe to="/" />
							{/* <Footer /> */}
						</>
					}
				/>
				<Route exact path="/home" element={<Navigate to="/" />} />

				<Route
					path="*"
					element={
						<center id="pageNotFound">
							<h1>Sorry, this page isn't available.</h1>
							<h2>Error: 404</h2>
							<a href="/login"> Go to Login Page</a>
						</center>
					}
				/>
			</Switch>
		</Suspense>
	);
}

export default Routes;
