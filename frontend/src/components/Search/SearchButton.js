import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDidMountEffect from './../../hook/useDidMountEffect';

const SearchButton = ({ setResponse, sname, dname }) => {
  const [startParam, setStartParam] = useState(""); // 128.59697,35.869545
  const [goalParam, setGoalParam] = useState(""); //128.61142,35.885387

  const onClick = async () => {
    let param1, param2;
    await axios
      .get("https://bacnktreeserver.herokuapp.com/mypath/", {
        params: {
          start: `${sname}`,
          goal: `${dname}`,
        },
      })
      .then((responseParam) => {
        param1 = responseParam.data[0][0].toString() + ',' + responseParam.data[0][1].toString();
        param2 = responseParam.data[1][0].toString() + ',' + responseParam.data[1][1].toString()
      })
      setStartParam(param1);
      setGoalParam(param2);
  }

  useDidMountEffect(() => {
    onSearch();
  }, [startParam, goalParam])

	const onSearch = async () => {
    await axios
      .get("/api/map-direction/v1/driving", {     // 출발지/도착지 위도, 경도 입력 -> 경로 반환
				params: {
          start: `${startParam}`,
          goal: `${goalParam}`,
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_API_KEY,
          "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_SECRET_KEY,
        },
      })
      .then((response) => {
        console.log(response);
        setResponse(response);
      });
  };



	return (
		<div>
			<button className='search-button' onClick={onClick}>길찾기</button>
		</div>
	);
};

export default SearchButton;