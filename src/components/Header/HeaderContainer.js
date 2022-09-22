import React from 'react';
import Explanation from './Explanation';
import Logo from './Logo';
import '../../style/Header.scss'

const HeaderContainer = () => {
	return (
		<div className='header-container'>
			<Logo />
			<Explanation />
		</div>
	);
};

export default HeaderContainer;