import React from 'react';
import axios from 'axios';

const SearchButton = ({ setResponse, sname, dname }) => {

	const onSearch = async () => {
    await axios
      .get("/api/map-direction/v1/driving", {
				params: {
          start: `${sname}`,
          goal: `${dname}`,
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_API_KEY,
          "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_SECRET_KEY,
        },
      })
      .then((response) => setResponse(response));
  };

	return (
		<div>
			<button className='search-button' onClick={onSearch}>길찾기</button>
		</div>
	);
};

export default SearchButton;