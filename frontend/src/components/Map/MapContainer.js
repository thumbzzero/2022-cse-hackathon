import React from 'react';
import Map from './Map';
import '../../style/Map.scss'

const MapContainer = ({ response, setSuccess }) => {

	return (
		<div className='map-container'>
			<Map response={response} setSuccess={setSuccess} />
		</div>
	);
};

export default MapContainer;