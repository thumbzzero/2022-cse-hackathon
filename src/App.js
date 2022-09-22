import React from 'react';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import MapContainer from './components/Map/MapContainer';
import SearchContainer from './components/Search/SearchContainer';
import './style/App.scss'

const App = () => {
  return (
    <div>
      <HeaderContainer />
      <div className='content-container'>
        <SearchContainer />
        <MapContainer />
      </div>
      <Footer />
    </div>
  );
};

export default App;
