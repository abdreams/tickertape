// src/components/TodaysStocks.js
import React, { useState } from 'react';

const dummyStocks = [
  { name: 'Kotak S&P BSE Sensex ETF', symbol: 'SENSEX1', price: 89.00, change: 10.15 },
  { name: 'Adani Total Gas Ltd', symbol: 'ATGL', price: 1039.30, change: 8.80 },
  { name: 'Adani Power Ltd', symbol: 'ADANIPOWER', price: 755.80, change: 8.22 },
  { name: 'Adani Enterprises Ltd', symbol: 'ADANIENT', price: 3411.35, change: 6.80 },
  { name: 'NHPC Ltd', symbol: 'NHPC', price: 107.25, change: 6.14 },
  { name: 'Adani Total Gas Ltd', symbol: 'ATGL', price: 1039.30, change: -8.80 },
  { name: 'Adani Power Ltd', symbol: 'ADANIPOWER', price: 755.80, change: -8.22 },
  { name: 'Adani Enterprises Ltd', symbol: 'ADANIENT', price: 3411.35, change: -6.80 },
  { name: 'NHPC Ltd', symbol: 'NHPC', price: 107.25, change: -6.14 },
];

const filters = {
  gainers: (stocks) => stocks.filter(stock => stock.change > 0),
  losers: (stocks) => stocks.filter(stock => stock.change < 0),
  mostActive: (stocks) => stocks, // dummy implementation
  high52W: (stocks) => stocks, // dummy implementation
  low52W: (stocks) => stocks, // dummy implementation
};

const TodaysStocks = () => {
  const [selectedFilter, setSelectedFilter] = useState('gainers');
  const [stocks, setStocks] = useState(filters[selectedFilter](dummyStocks));

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setStocks(filters[filter](dummyStocks));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Today's stocks</h2>
      <div className="mb-4">
        <button 
          className={`mr-4 ${selectedFilter === 'gainers' ? 'text-green-500' : ''}`}
          onClick={() => handleFilterChange('gainers')}
        >
          Gainers
        </button>
        <button 
          className={`mr-4 ${selectedFilter === 'losers' ? 'text-red-500' : ''}`}
          onClick={() => handleFilterChange('losers')}
        >
          Losers
        </button>
        <button 
          className={`mr-4 ${selectedFilter === 'mostActive' ? 'text-blue-500' : ''}`}
          onClick={() => handleFilterChange('mostActive')}
        >
          Most Active
        </button>
        <button 
          className={`mr-4 ${selectedFilter === 'high52W' ? 'text-blue-500' : ''}`}
          onClick={() => handleFilterChange('high52W')}
        >
          52W High
        </button>
        <button 
          className={`mr-4 ${selectedFilter === 'low52W' ? 'text-blue-500' : ''}`}
          onClick={() => handleFilterChange('low52W')}
        >
          52W Low
        </button>
      </div>
      <div>
        {stocks.map((stock, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div>
              <span className="font-semibold">{stock.name}</span>
              <span className="block text-gray-500">{stock.symbol}</span>
            </div>
            <div className="text-right">
              <span className="block">{`₹${stock.price.toFixed(2)}`}</span>
              <span className={`block ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {`${stock.change > 0 ? '▲' : '▼'} ${stock.change.toFixed(2)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysStocks;
