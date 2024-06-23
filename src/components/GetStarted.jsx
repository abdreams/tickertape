import React from 'react';

const GetStarted = ({ isDarkMode=true }) => {
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-6 rounded-lg shadow-md mb-6`}>
      <h2 className="text-2xl font-semibold mb-4">Get started</h2>
      <h3 className="text-xl font-bold mb-4">Track your stocks and mutual fund investments</h3>
      <p className="text-gray-600 mb-6">Import in 1-tap! takes less than a minute!</p>
      <ul className="mb-6 space-y-2">
        <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="text-purple-600 mr-2">🔗</span> Compare diversification score with the community
        </li>
        <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="text-green-600 mr-2">📈</span> Predict expected returns of your portfolio
        </li>
        <li className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className="text-orange-600 mr-2">⚠️</span> Find out red flags in your portfolio
        </li>
      </ul>
      <button className="bg-black text-white w-full py-2 rounded">Start</button>
    </div>
  );
};

export default GetStarted;
