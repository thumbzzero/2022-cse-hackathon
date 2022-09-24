import React, { useCallback, useState } from 'react';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import '../../style/Search.scss'
import RefreshButton from './RefreshButton';

const SearchContainer = ({ setResponse, success }) => {
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
			{success ? null : <div className='not-found'>해당 경로를 찾을 수 없습니다.</div>}
			<div className='notice'>
				※출발지와 도착지를 도로명 주소로 넣어주세요.※
				<br />※유효한 출발지와 도착지를 넣어야 경로를 찾을 수 있습니다.※
				<br />ex) 출발지와 도착지가 같으면 경로를 찾을 수 없습니다.
			</div>
		</div>
	);
};

export default SearchContainer;