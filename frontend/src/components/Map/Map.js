import React, { useEffect, useRef, useState } from "react";

const Map = ({ response }) => {
  const mapElement = useRef(null);
  const [lat, setLat] = useState(35.888894); // 위도
  const [lng, setLng] = useState(128.61029); // 경도

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    let polylinePath = [];

    console.log(`before null check: ${lat}, ${lng}`);

    if (response.data != null) {
      console.log("not null");

      const paths = response.data.route.traoptimal[0].path;
      paths.map((path) => {
        polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
      });

      setLat(paths[0][1]);
      setLng(paths[0][0]);
    }

    const location = new naver.maps.LatLng(lat, lng);
    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };


    const map = new naver.maps.Map(mapElement.current, mapOptions); // 지도 생성


    if (response.data != null) {
      map.setCenter(location);
      new naver.maps.Polyline({
        path: polylinePath,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 6,
        map: map,
      });

      new naver.maps.Marker({
        
        position: polylinePath[polylinePath.length - 1],
        map,
      });
    }
  }, [response, lat]);

  return (
    <>
      <div ref={mapElement} style={{ minHeight: "700px" }}></div>
    </>
  );
};

export default Map;
