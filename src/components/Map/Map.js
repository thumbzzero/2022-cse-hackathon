import React, { useEffect, useRef } from 'react';

const Map = () => {
	const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표
    const location = new naver.maps.LatLng(35.888894, 128.610290);
    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

	return (
    <>
		<div ref={mapElement} style={{ minHeight: '700px' }}>
			
		</div>

    </>
	);
};

export default Map;