import React, { useCallback, useState } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import '../../style/Search.scss'
import RefreshButton from './RefreshButton';

const SearchContainer = ({ setResponse }) => {
	const [sname, setSname] = useState('');
	const [dname, setDname] = useState('');

	const onSnameChange = useCallback((e) => {
		setSname(e.target.value);
	}, []);

	const onDnameChange = useCallback((e) => {
		setDname(e.target.value);
	}, []);

	const onRefresh = useCallback(() => {
		setSname('');
		setDname('');
	}, []);

	return (
		<div className='search-container'>
			<SearchInput place={'출발지'} value={sname} onChange={onSnameChange} />
			<SearchInput place={'도착지'} value={dname} onChange={onDnameChange} />
			<div className='btn-container'>
				<RefreshButton onRefresh={onRefresh} />
				<SearchButton setResponse={setResponse} sname={sname} dname={dname} />
			</div>
		</div>
	);
};

export default SearchContainer;