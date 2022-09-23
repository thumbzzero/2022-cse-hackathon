import React, { useEffect, useRef, useState } from "react";

const Map = ({ response }) => {
  const mapElement = useRef(null);
  const [lat, setLat] = useState(35.888894); // 위도
  const [lng, setLng] = useState(128.61029); // 경도

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    let polylinePath = [];

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
    
    
    // // polyline 2개 되는지 test
    // const samplepaths = [
    //   [127.1059979, 37.3597094],
    //   [127.1059979, 37.3597049],
    //   [127.1059979, 37.3597031],
    //   [127.1060042, 37.3593669],
    //   [127.106004, 37.3591912],
    //   [127.1060086, 37.3589577],
    //   [127.1060019, 37.3585043],
    //   [127.1060033, 37.3584628],
    //   [127.1060071, 37.3583844],
    //   [127.1060072, 37.3583664],
    //   [127.1060061, 37.3583502]

    // ];
    

    // let samplePath = [];
    // samplepaths.map((path) => {
    //   samplePath.push(new naver.maps.LatLng(path[1], path[0]));
    // });
  
    // new naver.maps.Polyline({
    //   path: samplePath,
    //   strokeColor: "#F2BB13",
    //   strokeOpacity: 0.9,
    //   strokeWeight: 15,
    //   map: map,
    // });

    if (response.data != null) {
      map.setCenter(location);
      new naver.maps.Polyline({
        path: polylinePath,
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWeight: 6,
        map: map,
      });

      new naver.maps.Marker({
        position: polylinePath[polylinePath.length - 1],
        map,
      });
    }
  }, [response, lat, lng]);

  return (
      <div ref={mapElement} style={{ minHeight: "700px" }}></div>
  );
};

export default Map;
