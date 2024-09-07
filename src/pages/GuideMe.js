import React, { useEffect, useState, useCallback } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// import axios from "axios";

import Loader from "../components/loader/Loader";
import ShowMsg from "../components/showMsg/ShowMsg";
import back_1 from "../images/back_1.jpeg";
import back_2 from "../images/back_2.jpeg";
import back_3 from "../images/back_3.jpeg";
import projector_1 from "../images/projector_1.jpeg";
import projector_2 from "../images/projector_2.jpeg";
import projector_3 from "../images/projector_3.jpeg";
import stage_1 from "../images/stage_1.jpeg";
import stage_2 from "../images/stage_2.jpeg";
import stage_3 from "../images/stage_3.jpeg";

import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

import "../styles/guideMe.css";

// Fix default icon issue with React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const position = [31.2541, 75.7];

const data = [
	{
		name: "LPU Block 14 101 L Back Side",
		latitude: 31.254292175131418,
		longitude: 75.70565944949598,
		desc: [
			"There are 3 posters at the back of block 14-101L.",
			"Poster 1: 'EITHER YOU RUN THE DAY OR THE DAY RUNS YOU'",
			"Poster 2: 'BELIEVE YOU CAN AND YOU ARE HALFWAY THERE'",
			"Poster 3: 'LIFE'S A STAGE AND YOU GET ONLY ONE PERFORMANCE. MAKE IT GOOD ONE'",
		],
		img: [back_1, back_2, back_3],
	},
	{
		name: "projector",
		latitude: 31.25424116115149,
		longitude: 75.70566477808288,
		desc: [
			"1080p projectors offer a resolution of 1920 x 1080 pixels, providing clear and detailed visuals.",
			"Perfect for home theaters, gaming, and presentations, they match Full HD content like Blu-rays and HD broadcasts.",
			"There is a emergency exit at the side of the projector.",
		],
		img: [projector_1, projector_2, projector_3],
	},
	{
		name: "mainStage",
		latitude: 31.254395777874144,
		longitude: 75.70563783018873,
		desc: [
			"The main stage refers to the largest or most prestigious performance space within a theatre building.",
			"It's where major productions take place, whether it's a play, musical, or dance performance.",
			"Typically found in proscenium theatres or on thrust stages, the main stage is the focal point for both actors and audiences1.",
		],
		img: [stage_1, stage_2, stage_3],
	},
];

function GuideME() {
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useState(null);
	const [weather, setWeather] = useState(null);
	const [result, setResult] = useState(null);
	const [msg, setMsg] = useState({ text: "", type: "" });
	const [active, setActive] = useState(null);

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: "", type: "" });
			}, 2500);
		} else {
			console.log("Please Provide Text Msg");
		}
	}, []);

	const findMinDistance = (d1, d2, d3) => {
		if (d1 < d2 && d1 < d3) {
			return 0;
		} else if (d2 < d1 && d2 < d3) {
			return 1;
		} else {
			return 2;
		}
	};
	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		setLocation({ latitude, longitude });
		console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

		for (let i = 0; i < data.length; i++) {
			const dis1 = getDistanceFromLatLonInKm(data[0]?.latitude, data[0]?.longitude, latitude, longitude);
			const dis2 = getDistanceFromLatLonInKm(data[1]?.latitude, data[1]?.longitude, latitude, longitude);
			const dis3 = getDistanceFromLatLonInKm(data[2]?.latitude, data[2]?.longitude, latitude, longitude);

			console.log(dis1, dis2, dis3);

			const distance = findMinDistance(dis1, dis2, dis3);
			setActive(distance);

			// console.log("distance" + i, distance);

			// if (distance < 6) {
			// 	setActive(i);
			// 	// break;
			// }
		}

		try {
			fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
				.then((response) => response.json())
				.then((data) => {
					setWeather(data);
					setLoading(false);
					// handleFetch("about" + data?.address?.amenity);
					console.log(data);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
		}
	}

	function error1() {
		console.log("Unable to retrieve your location");
	}

	// const handleFetch = async (identifier) => {
	// 	try {
	// 		// Replace `YOUR_API_ENDPOINT` with the actual Gemini API endpoint
	// 		const response = await axios.get(`https://api.gemini.com/v1/pubticker/${identifier}`);
	// 		setResult(response.data);
	// 		handleMsgShown(null);
	// 	} catch (err) {
	// 		// handleMsgShown(err.message);
	// 		setResult(null);
	// 	}
	// };

	function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = deg2rad(lat2 - lat1); // deg2rad below
		var dLon = deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c * 1000; // Distance in meter
		return d;
	}

	function deg2rad(deg) {
		return deg * (Math.PI / 180);
	}

	// console.log(
	// 	getDistanceFromLatLonInKm(data[0]?.latitude, data[0]?.longitude, location?.latitude, location?.longitude)
	// );

	useEffect(() => {
		function handleLocationClick() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success, error1);
				console.log("Geolocation supported");
			} else {
				console.log("Geolocation not supported");
			}
		}
		handleLocationClick();
	}, []);

	console.log(active);

	return (
		<div id="GuideME">
			{data?.[active] && (
				<Slide transitionDuration="700" duration="2000" indicators={true} autoplay={true} easing="ease">
					{data?.[active]?.img.map((each, index) => (
						<div className="each-slide-effect" key={index}>
							<div className="sliderImg" style={{ backgroundImage: `url(${each})` }}></div>
						</div>
					))}
				</Slide>
			)}

			<div className="GuideME_box">
				<Loader isLoading={loading} />
				<h1>{data?.[active]?.name}</h1>
				<p>{data?.[active]?.desc}</p>
			</div>

			<MapContainer center={position} zoom={13} style={{ height: "50vh", width: "100%" }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>

			{msg && <ShowMsg msgText={msg?.text} type={msg?.type} />}
		</div>
	);
}

export default GuideME;
