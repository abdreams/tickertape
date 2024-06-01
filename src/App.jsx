// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import MarketStatus from './components/MarketStatus';
import MarketSectors from './components/MarketSectors';
import GetStarted from './components/GetStarted';
import News from './components/News';
import TodaysStocks from './components/TodaysStocks';
import StockMarquee from './components/StockMarquee';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <StockMarquee />
      <Navbar />
      <MarketStatus />
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <MarketSectors />
          <div className="flex justify-between mt-6">
            <div className="w-2/3 mr-6">
              <GetStarted />
              <TodaysStocks />
            </div>
            <div className="w-1/3">
              <News />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
