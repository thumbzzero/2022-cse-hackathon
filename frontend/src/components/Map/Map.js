import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Map = ({ response, setSuccess }) => {
  const mapElement = useRef(null);
  const [lat, setLat] = useState(35.888894); // 위도
  const [lng, setLng] = useState(128.61029); // 경도

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    let polylinePath = [];
    let banktreePath = [];
 
    axios.get("https://bacnktreeserver.herokuapp.com/").then((banktree) => {
      banktree.data.map((path) => {
        
        axios
        .get("/api/map-direction/v1/driving", {
          params: {
            start: `${path.startY},${path.startX}`,
            goal: `${path.goalY},${path.goalX}`,
          },
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_API_KEY,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_SECRET_KEY,
          },
        })
        .then((res) => {
          res.data.route.traoptimal[0].path.map((path) => {
            banktreePath.push(new naver.maps.LatLng(path[1], path[0]));
          });
          new naver.maps.Polyline({
            path: banktreePath,
            strokeColor: "#F2BB13",
            strokeOpacity: 0.5,
            strokeWeight: 10,
            map: map,
          });
          banktreePath = [];

        });
        
        
    });
    });



    if (response.data != null) {
      if (response.data.code === 0) {
        setSuccess(true);
        const paths = response.data.route.traoptimal[0].path;
        paths.map((path) => {
          polylinePath.push(new naver.maps.LatLng(path[1], path[0]));
        });

        setLat(paths[0][1]);
        setLng(paths[0][0]);
      } else {
        setSuccess(false);
      }
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
        strokeOpacity: 1.0,
        strokeWeight: 6,
        map: map,
      });

      new naver.maps.Marker({
        position: polylinePath[polylinePath.length - 1],
        map,
      });
    }
  }, [response, lat, lng]);

  return <div ref={mapElement} style={{ minHeight: "700px" }}></div>;
};

export default Map;
