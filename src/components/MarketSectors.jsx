import React from 'react';

const dummyData = [
  { name: 'NIFTY 50', value: 22550.40, change: 0.27, isPositive: true },
  { name: 'USD/INR', value: 83.52, change: 0.19, isPositive: true },
  { name: 'Gold', value: 7385.95, change: -0.07, isPositive: false },
  { name: 'NIFTY 100 Largecap', value: 23538.60, change: 0.31, isPositive: true },
  { name: 'NIFTY 100 Midcap', value: 51735.95, change: 0.60, isPositive: true },
  { name: 'NIFTY 100 Smallcap', value: 16710.25, change: 0.59, isPositive: true },
  { name: 'NIFTY Bank', value: 48982.40, change: 0.62, isPositive: true },
  { name: 'NIFTY IT', value: 32458.85, change: -1.06, isPositive: false },
  { name: 'NIFTY Pharma', value: 18849.70, change: -0.64, isPositive: false },
];

const MarketSectors = ({ isDarkMode=true }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-md w-full max-w-6xl mx-auto`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Market and sectors</span>
        <a href="#" className="text-blue-500">See All</a>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {dummyData.map((item, index) => (
          <div key={index} className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
            <div>
              <span>{item.name}</span>
              <span className="block text-lg font-semibold">{item.value.toFixed(2)}</span>
            </div>
            <div className={`text-${item.isPositive ? 'green' : 'red'}-500`}>
              <span>{item.change > 0 ? '▲' : '▼'} {item.change.toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketSectors;
