import React from 'react';
// import PerformanceChart from './PerformanceChart';
import PortfolioTable from './PortfolioTable';

const portfolioData = [
    { date: '2021-07-01', value: 50000 },
    { date: '2021-12-01', value: 75000 },
    { date: '2022-06-01', value: 100000 },
    { date: '2022-12-01', value: 125000 },
    { date: '2023-06-01', value: 150000 },
    { date: '2023-12-01', value: 252501 }
];

export default function Portfolio() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
            <h1 className="text-5xl font-semibold mb-8">Portfolio</h1>
            {/* <PerformanceChart data={portfolioData} /> */}
            <div className="w-full max-w-4xl mt-8">
                {/* Placeholder for Portfolio Diversity */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Portfolio Diversity</h2>
                    {/* Portfolio Diversity Content Here */}
                </div>
                <PortfolioTable />
            </div>
        </div>
    );
}
