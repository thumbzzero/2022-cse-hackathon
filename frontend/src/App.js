import React, { useState, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import MapContainer from './components/Map/MapContainer';
import SearchContainer from './components/Search/SearchContainer';
import './style/App.scss'

const App = () => {
  const [response, setResponse] = useState({});
  useEffect(() => { 
    // console.log(`길찾기 결과:`)
    // console.log(response)
  }, [response])
  return (
    <div>
      <HeaderContainer />
      <div className='content-container'>
        <SearchContainer response={response} setResponse={setResponse} />
        <MapContainer response={response} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
