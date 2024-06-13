import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

// Dummy data for stock details
const dummyStockDetails = {
  stockname: 'Apple Inc.',
  stockvalue: 145.09,
  '1week': [
    { date: '2023-06-01', value: 142 },
    { date: '2023-06-02', value: 143 },
    { date: '2023-06-03', value: 144 },
    { date: '2023-06-04', value: 145 },
    { date: '2023-06-05', value: 146 },
    { date: '2023-06-06', value: 147 },
    { date: '2023-06-07', value: 148 }
  ],
  '1month': [
    { date: '2023-05-01', value: 140 },
    { date: '2023-05-08', value: 142 },
    { date: '2023-05-15', value: 143 },
    { date: '2023-05-22', value: 145 },
    { date: '2023-05-29', value: 147 }
  ],
  '1year': [
    { date: '2023-01-01', value: 130 },
    { date: '2023-02-01', value: 135 },
    { date: '2023-03-01', value: 140 },
    { date: '2023-04-01', value: 145 },
    { date: '2023-05-01', value: 150 },
    { date: '2023-06-01', value: 155 }
  ]
};

const FETCH_URL = 'https://dummyapi.io/data/api/stockdetails';  // Replace with actual endpoint

const StockDetails = () => {
  const { stocksymbol } = useParams();
  const [stockData, setStockData] = useState(dummyStockDetails);
  const [timeRange, setTimeRange] = useState('1week');

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await fetch(`${FETCH_URL}/${stocksymbol}`);
        const result = await response.json();
        setStockData(result);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
    };

    fetchStockDetails();
  }, [stocksymbol]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const { stockname, stockvalue } = stockData;
  const currentData = stockData[timeRange];

  const data = {
    labels: currentData.map(entry => entry.date),
    datasets: [
      {
        label: 'Stock Value',
        data: currentData.map(entry => entry.value),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue'
      }
    ]
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow w-3/5">
      <h2 className="text-lg font-semibold mb-4">{stockname} ({stocksymbol})</h2>
      <p className="text-xl font-semibold mb-4">Current Price: ${stockvalue}</p>
      <div className="mb-4">
        <button onClick={() => setTimeRange('1week')} className={`mr-2 ${timeRange === '1week' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} px-3 py-1 rounded-lg`}>1 Week</button>
        <button onClick={() => setTimeRange('1month')} className={`mr-2 ${timeRange === '1month' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} px-3 py-1 rounded-lg`}>1 Month</button>
        <button onClick={() => setTimeRange('1year')} className={`mr-2 ${timeRange === '1year' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} px-3 py-1 rounded-lg`}>1 Year</button>
      </div>
      <Line data={data} />
    </div>
  );
};

export default StockDetails;
