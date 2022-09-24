import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Map = ({ response, setSuccess }) => {
  const mapElement = useRef(null);
  const [lat, setLat] = useState(35.888894); // 위도
  const [lng, setLng] = useState(128.61029); // 경도
  let bankRoad = [];
  // let bankPath = [];

  // const [bankPath, setBankPath] = useState([]);
  /*
  useEffect(() => {
    let bankPath = [];
    
    axios.get("https://bacnktreeserver.herokuapp.com/").then((banktree) => {
      bankPath = Array(banktree.length);
      banktree.data.map((path) => {
        bankRoad.push([path.start_x, path.start_y, path.goal_x, path.goal_y]);
      });
    });

    bankRoad.map((road) => {
      axios
      .get("/api/map-direction/v1/driving", {
        params: {
          start: `${road[1]},${road[0]}`,
          goal: `${road[3]},${road[2]}`,
        },
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_API_KEY,
          "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_SECRET_KEY,
        }
      
      }).then((res) => {
        res.data.route.traoptimal[0].path.map((path) => {
          //bankPath.push(new naver.maps.LatLng(path[1], path[0]));
          bankPath[path.id].push(new naver.maps.LatLng([path[1], path[0]]));
        })
      });
    })
  }, []);
*/

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    let polylinePath = [];
    /* 요기부터*/
    let bankPath = [];

    axios.get("https://bacnktreeserver.herokuapp.com/").then((banktree) => {
      bankPath = Array(banktree.length);
      banktree.data.map((path) => {
        bankRoad.push([path.start_x, path.start_y, path.goal_x, path.goal_y]);
      });
    });

    

    /* 요까지*/

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

    /** */
    bankRoad.map((road) => {
      axios
        .get("/api/map-direction/v1/driving", {
          params: {
            start: `${road[1]},${road[0]}`,
            goal: `${road[3]},${road[2]}`,
          },
          headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAP_API_KEY,
            "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAP_SECRET_KEY,
          },
        })
        .then((res) => {
          console.log(res);
          res.data.route.traoptimal[0].path.map((path) => {
            bankPath[path.id].push(new naver.maps.LatLng([path[1], path[0]]));
          });
        });
    });
 
    for (let i = 0; i < bankPath.length; i++) {
      new naver.maps.Polyline({
        path: bankPath[i],
        strokeColor: "#F2BB13",
        strokeOpacity: 0.9,
        strokeWeight: 15,
        map: map,
      });
    }

    /** */

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

  return <div ref={mapElement} style={{ minHeight: "700px" }}></div>;
};

export default Map;
