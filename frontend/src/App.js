import React, { useState, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import MapContainer from './components/Map/MapContainer';
import SearchContainer from './components/Search/SearchContainer';
import './style/App.scss'

const App = () => {
  const [response, setResponse] = useState({});
  const [success, setSuccess] = useState(true);
  return (
    <div>
      <HeaderContainer />
      <div className='content-container'>
        <SearchContainer response={response} setResponse={setResponse} success={success} />
        <MapContainer response={response} setSuccess={setSuccess} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
