import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend);

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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end">
        <Link to="/users" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 mr-10 rounded">
          Go to Users
        </Link>
        <Link to="/editstocks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded">
          Edit Stocks
        </Link>
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
          <h2 className="text-lg font-semibold mb-4">Portfolio Worth Over Time</h2>
          <div className="max-w-full mx-auto">
            <Line data={portfolioWorthData} options={{ responsive: true }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Investment Distribution</h2>
          <div className="max-w-full mx-auto w-3/5">
            <Pie data={investmentDistributionData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
