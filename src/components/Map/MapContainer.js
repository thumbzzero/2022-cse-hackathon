import React from 'react';
import Map from './Map';
import '../../style/Map.scss'
// import MapPractice from './MapPractice';
import { Routes, Route } from 'react-router-dom/dist';

const MapContainer = ({ response }) => {
	const url = "namp://map?&appname=http://localhost:3000/practice"
	return (
		<div className='map-container'>
			<Routes>
				<Route path="/" element={<Map response={response} />} />
				{/* <Route path="/practice" element={<MapPractice />} /> */}
				<Route path={`${url}`} />
			</Routes>
			
			{/* <MapPractice /> */}
		</div>
	);
};

export default MapContainer;