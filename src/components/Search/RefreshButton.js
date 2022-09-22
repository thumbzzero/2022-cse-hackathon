import React from 'react';
import { BiRefresh } from "react-icons/bi";

const RefreshButton = ({ onRefresh }) => {
	return (
		<>
			<button className='refresh-button' onClick={onRefresh}><BiRefresh /> 다시 입력</button>
		</>
	);
};

export default RefreshButton;