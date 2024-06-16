import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Select from 'react-select';

const dummyStockDetails = {
  AAPL: {
    stockname: 'Apple Inc.',
    stockvalue: 145.09,
    change: 5,
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
  },
  MSFT: {
    stockname: 'MSFT',
    stockvalue: 145.09,
    change: 5,
    '1week': [
      { date: '2023-06-01', value: 160 },
      { date: '2023-06-02', value: 163 },
      { date: '2023-06-03', value: 164 },
      { date: '2023-06-04', value: 145 },
      { date: '2023-06-05', value: 136 },
      { date: '2023-06-06', value: 147 },
      { date: '2023-06-07', value: 118 }
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
  },
  AMZN: {
    stockname: 'AMZN',
    stockvalue: 145.09,
    change: 5,
    '1week': [
      { date: '2023-06-01', value: 102 },
      { date: '2023-06-02', value: 183 },
      { date: '2023-06-03', value: 124 },
      { date: '2023-06-04', value: 145 },
      { date: '2023-06-05', value: 196 },
      { date: '2023-06-06', value: 107 },
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
  },
  GOOGL: {
    stockname: 'GOOGL',
    stockvalue: 145.09,
    change: 5,
    '1week': [
      { date: '2023-06-01', value: 182 },
      { date: '2023-06-02', value: 123 },
      { date: '2023-06-03', value: 140 },
      { date: '2023-06-04', value: 195 },
      { date: '2023-06-05', value: 126 },
      { date: '2023-06-06', value: 147 },
      { date: '2023-06-07', value: 118 }
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
  },
  FB: {
    stockname: 'FB',
    stockvalue: 145.09,
    change: 5,
    '1week': [
      { date: '2023-06-01', value: 102 },
      { date: '2023-06-02', value: 163 },
      { date: '2023-06-03', value: 124 },
      { date: '2023-06-04', value: 145 },
      { date: '2023-06-05', value: 106 },
      { date: '2023-06-06', value: 147 },
      { date: '2023-06-07', value: 198 }
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
  }
};

const dummyStockData = [
    { stocksymbol: 'AAPL', value: 145.09, change: 5 },
    { stocksymbol: 'MSFT', value: 299.79, change: 5 },
    { stocksymbol: 'AMZN', value: 3478.05, change: 5 },
    { stocksymbol: 'GOOGL', value: 2729.89, change: 5 },
    { stocksymbol: 'FB', value: 355.64, change: 5 }
    ];

const StockComparision = () => {
  const FETCH_SUMMARY_URL = 'https://api.example.com/stock-summary'; // Replace with your API URL
  const FETCH_DETAILS_URL = 'https://api.example.com/stock-details'; // Replace with your API URL

  const [selectedStocks, setSelectedStocks] = useState([]);
  const [stockSummary, setStockSummary] = useState([]);
  const [stockDetails, setStockDetails] = useState([]);
  const [timeRange, setTimeRange] = useState('1week');

  const fetchStockSummary = async () => {
    try {
      const response = await fetch(FETCH_SUMMARY_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setStockSummary(result);
    } catch (error) {
      console.error('Error fetching stock summary:', error);
      setStockSummary(dummyStockData);
    }
  };

  const fetchStockDetails = async (symbol) => {
    try {
      const response = await fetch(`${FETCH_DETAILS_URL}/${symbol}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching stock details:', error);
      return dummyStockDetails[symbol];
    }
  };

  useEffect(() => {
    fetchStockSummary();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const details = await Promise.all(
        selectedStocks.map(symbol => fetchStockDetails(symbol))
      );
      setStockDetails(details.filter(detail => detail !== null));
    };

    if (selectedStocks.length > 0) {
      fetchData();
    }
  }, [selectedStocks]);

  const handleAddStock = (option) => {
    const symbol = option.value;
    if (!selectedStocks.includes(symbol) && selectedStocks.length < 4) {
      setSelectedStocks([...selectedStocks, symbol]);
    }
  };

  const handleRemoveStock = (symbol) => {
    setSelectedStocks(selectedStocks.filter(stock => stock !== symbol));
  };

  const stockOptions = stockSummary.map(stock => ({
    value: stock.stocksymbol,
    label: stock.stocksymbol
  }));

  const chartData = {
    labels: stockDetails.length > 0 ? stockDetails[0][timeRange].map(item => item.date) : [],
    datasets: stockDetails.map((stock, index) => ({
      label: stock.stockname,
      data: stock[timeRange].map(item => item.value),
      fill: false,
      backgroundColor: `rgba(${index * 60}, 99, 132, 0.5)`,
      borderColor: `rgba(${index * 60}, 99, 132, 1)`,
    })),
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Compare Stocks</h2>
      <div className="mb-4">
        <Select
          options={stockOptions}
          onChange={handleAddStock}
          placeholder="Add Stock"
          className="w-full"
        />
      </div>
      <div className="flex mb-4 flex-wrap">
        {selectedStocks.map(symbol => (
          <div key={symbol} className="mr-4 mb-2">
            <span>{symbol}</span>
            <button onClick={() => handleRemoveStock(symbol)} className="ml-2 text-red-500">Remove</button>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <button onClick={() => setTimeRange('1week')} className={`mr-2 ${timeRange === '1week' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} px-3 py-1 rounded-lg`}>1 Week</button>
        <button onClick={() => setTimeRange('1month')} className={`mr-2 ${timeRange === '1month' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} px-3 py-1 rounded-lg`}>1 Month</button>
        <button onClick={() => setTimeRange('1year')} className={`mr-2 ${timeRange === '1year' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} px-3 py-1 rounded-lg`}>1 Year</button>
      </div>
      <div className="flex justify-center mb-4" style={{ maxHeight: '400px' }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Line data={chartData} />
        </div>
      </div>
      <table className="table-auto w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Current Price</th>
            <th className="border px-4 py-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {selectedStocks.map(symbol => {
            const stock = stockSummary.find(stock => stock.stocksymbol === symbol);
            return (
              <tr key={symbol}>
                <td className="border px-4 py-2 text-center">{symbol}</td>
                <td className="border px-4 py-2 text-center">{stock.value}</td>
                <td className="border px-4 py-2 text-center">{stock.change}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockComparision;
