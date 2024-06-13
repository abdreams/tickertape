import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

const dummyStockDetails = {
    stockname: 'Apple Inc.',
    value: 145.09,
    '1week': { dates: ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06', '2023-06-07'], values: [142, 143, 144, 145, 146, 147, 148] },
    '1month': { dates: ['2023-05-01', '2023-05-08', '2023-05-15', '2023-05-22', '2023-05-29'], values: [140, 142, 143, 145, 147] },
    '1year': { dates: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'], values: [130, 135, 140, 145, 150, 155] }
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

  const { stockname, value, [timeRange]: { dates, values } } = stockData;

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Stock Value',
        data: values,
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue'
      }
    ]
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow w-3/5">
      <h2 className="text-lg font-semibold mb-4">{stockname} ({stocksymbol})</h2>
      <p className="text-xl font-semibold mb-4">Current Price: ${value}</p>
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
