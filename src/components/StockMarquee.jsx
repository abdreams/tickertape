// src/components/StockMarquee.js
import React from 'react';

const stockData = [
  { name: 'HDFCBANK', price: 1531.55, change: 1.10 },
  { name: 'HINDUNILVR', price: 2329.05, change: -0.95 },
  { name: 'INDIGO', price: 4189.05, change: 0.65 },
  { name: 'ITC', price: 426.45, change: 0.61 },
  { name: 'MARUTI', price: 12399.30, change: -1.58 },
  { name: 'RELIANCE', price: 2860.80, change: 0.39 },
  { name: 'HINDUNILVR', price: 2329.05, change: -0.95 },
  { name: 'INDIGO', price: 4189.05, change: 0.65 },
  { name: 'ITC', price: 426.45, change: 0.61 },
  { name: 'MARUTI', price: 12399.30, change: -1.58 },
  { name: 'RELIANCE', price: 2860.80, change: 0.39 },
];

const StockMarquee = () => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-gray-900 text-white">
      <div className="animate-marquee flex">
        {stockData.map((stock, index) => (
          <div key={index} className="mx-4 flex items-center">
            <span className="font-bold mr-2">{stock.name}</span>
            <span>{stock.price.toFixed(2)}</span>
            <span className={`ml-2 ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? `▲ ${stock.change}%` : `▼ ${stock.change}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockMarquee;
