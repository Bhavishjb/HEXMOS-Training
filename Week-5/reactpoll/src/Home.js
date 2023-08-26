import React, { useState } from 'react';
import './Home.css';
import Heading from './Heading';
import Sidebar from './Sidebar';
import MainComponent from './MainComponent';

export const FilterContext = React.createContext();

function Home() {
  const [filteredData, setFilteredData] = useState([]);
  const handleFilteredList = React.useMemo(() => ({ filteredData, setFilteredData }), [filteredData]);

  return (
    <div className="home-container">
      <Heading />
      <br />
      
      <FilterContext.Provider value={handleFilteredList}>

        <div className="content">
          <div className="column side">
            <Sidebar />
          </div>
          <div className="column main">
            <MainComponent />
          </div>
        </div>
      </FilterContext.Provider>
      
    </div>
  );
}

export default Home;
