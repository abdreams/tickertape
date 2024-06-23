import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Line, Pie, Doughnut, Bar, PolarArea, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaChartBar, FaChartArea, FaChartLine } from 'react-icons/fa';
import { LuRadar } from "react-icons/lu";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler);

const AdminDashboard = () => {
  // Dummy data
  const totalUsers = 120;
  const totalPortfolios = 300;
  const totalAmountInvested = 5000000;
  const totalWorth = 8000000;
  const profitLoss = 3000000;

  const portfolioWorthData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Portfolio Worth',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        data: [6500000, 6600000, 6800000, 7000000, 8000000],
        fill: true,
      }
    ]
  };

 
  const investmentDistributionData = {
    labels: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'],
    datasets: [
      {
        data: [3000000, 1500000, 1000000, 2500000, 1000000],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

  // const investmentDistributionData = {
  //   labels: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'],
  //   datasets: [
  //     {
  //       data: [3000000, 1500000, 1000000, 2500000, 1000000],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)', // Transparent red
  //         'rgba(54, 162, 235, 0.2)', // Transparent blue
  //         'rgba(255, 206, 86, 0.2)', // Transparent yellow
  //         'rgba(75, 192, 192, 0.2)', // Transparent teal
  //         'rgba(153, 102, 255, 0.2)' // Transparent purple
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)', // Solid red
  //         'rgba(54, 162, 235, 1)', // Solid blue
  //         'rgba(255, 206, 86, 1)', // Solid yellow
  //         'rgba(75, 192, 192, 1)', // Solid teal
  //         'rgba(153, 102, 255, 1)' // Solid purple
  //       ],
  //       borderWidth: 1,
  //     }
  //   ]
  // };

  const navigate = useNavigate();

  // State to manage the selected chart type
  const [pieChartType, setPieChartType] = useState('pie');
  const [lineChartType, setLineChartType] = useState('line');

  const handleRebalanceClick = () => {
    const newTab = window.open('/rebalance', '_blank');
    if (!newTab) {
      toast.error('Please allow pop-ups for this website');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end">
        <Link to="/users" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 mr-10 rounded">
          Go to Users
        </Link>
        <Link to="/editstocks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded">
          Edit Stocks
        </Link>
        <button onClick={handleRebalanceClick} className="px-4 py-2 bg-blue-500 text-white rounded">
          Rebalance Portfolio
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Portfolios</h2>
          <p className="text-2xl">{totalPortfolios}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Amount Invested</h2>
          <p className="text-2xl">{totalAmountInvested.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Worth</h2>
          <p className="text-2xl">{totalWorth.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Profit/Loss</h2>
          <p className="text-2xl">{profitLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Portfolio Worth Over Time</h2>
            <div>
              <button onClick={() => setLineChartType('line')} className="mx-2">
                <FaChartLine className="h-6 w-6" />
              </button>
           
              <button onClick={() => setLineChartType('radar')} className="mx-2">
                <LuRadar className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="max-w-full mx-auto">
            {lineChartType === 'line' && <Line 
              data={portfolioWorthData} 
              options={{ 
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />}
            
            {lineChartType === 'radar' && <Radar 
              data={portfolioWorthData} 
              options={{ 
                responsive: true,
                scales: {
                  r: {
                    beginAtZero: true
                  }
                }
              }} 
            />}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Investment Distribution</h2>
            <div>
              <button onClick={() => setPieChartType('pie')} className="mx-2">
                <FaChartPie className="h-6 w-6" />
              </button>
              <button onClick={() => setPieChartType('doughnut')} className="mx-2">
                <FaChartPie className="h-6 w-6" />
              </button>
              <button onClick={() => setPieChartType('bar')} className="mx-2">
                <FaChartBar className="h-6 w-6" />
              </button>
              <button onClick={() => setPieChartType('radial')} className="mx-2">
                <FaChartArea className="h-6 w-6" />
              </button>
              <button onClick={() => setPieChartType('radar')} className="mx-2">
                <LuRadar className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="max-w-full mx-auto w-3/5">
            {pieChartType === 'pie' && <Pie data={investmentDistributionData} options={{ responsive: true }} />}
            {pieChartType === 'doughnut' && <Doughnut data={investmentDistributionData} options={{ responsive: true }} />}
            {pieChartType === 'bar' && <Bar 
              data={investmentDistributionData} 
              options={{ 
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }} 
            />}
            {pieChartType === 'radial' && <PolarArea data={investmentDistributionData} options={{ responsive: true }} />}
            {pieChartType === 'radar' && <Radar 
              data={investmentDistributionData} 
              options={{ 
                responsive: true,
                scales: {
                  r: {
                    beginAtZero: true
                  }
                }
              }} 
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
