import React, { useEffect, useState, useCallback } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import axios from 'axios';

import Loader from '../components/loader/Loader';
import ShowMsg from '../components/showMsg/ShowMsg';
import lpuIMG from '../images/lpu.avif';
import lpuIMG2 from '../images/lpu2.jpg';

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';

import '../styles/guideMe.css';

// Fix default icon issue with React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function GuideME() {
	const [loading, setLoading] = useState(true);
	// const [location, setLocation] = useState(null);
	const [weather, setWeather] = useState(null);
	const [result, setResult] = useState(null);
	const [msg, setMsg] = useState({ text: '', type: '' });

	const handleMsgShown = useCallback((msgText, type) => {
		if (msgText) {
			setMsg({ text: msgText, type: type });
			setTimeout(() => {
				setMsg({ text: '', type: '' });
			}, 2500);
		} else {
			console.log('Please Provide Text Msg');
		}
	}, []);

	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		// setLocation([latitude, longitude]);
		console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

		try {
			fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
				.then((response) => response.json())
				.then((data) => {
					setWeather(data);
					setLoading(false);
					handleFetch('about' + data?.address?.amenity);
					console.log(data);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
		}
	}

	function error1() {
		console.log('Unable to retrieve your location');
	}

	useEffect(() => {
		function handleLocationClick() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(success, error1);
				console.log('Geolocation supported');
			} else {
				console.log('Geolocation not supported');
			}
		}
		handleLocationClick();
	}, []);

	const handleFetch = async (identifier) => {
		try {
			// Replace `YOUR_API_ENDPOINT` with the actual Gemini API endpoint
			const response = await axios.get(`https://api.gemini.com/v1/pubticker/${identifier}`);
			setResult(response.data);
			handleMsgShown(null);
		} catch (err) {
			// handleMsgShown(err.message);
			setResult(null);
		}
	};

	const position = [31.2541, 75.7];

	return (
		<div id="GuideME">
			<Slide transitionDuration="700" duration="2000" indicators={true} autoplay={true} easing="ease">
				{[lpuIMG, lpuIMG2].map((each, index) => (
					<div className="each-slide-effect" key={index}>
						<div className="sliderImg" style={{ backgroundImage: `url(${each})` }}></div>
					</div>
				))}
			</Slide>

			<div className="GuideME_box">
				<Loader isLoading={loading} />
				<h1>{weather?.address?.amenity}</h1>
				<p>{result}</p>
			</div>

			<MapContainer center={position} zoom={13} style={{ height: '50vh', width: '100%' }}>
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
