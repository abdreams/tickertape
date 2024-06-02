import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const portfolios = [
    { name: 'Tech Growth', description: 'A portfolio focused on technology stocks.', capital: 50000, timeHorizon: 365, riskAppetite: 70 },
    { name: 'Stable Income', description: 'A portfolio focused on dividend stocks.', capital: 30000, timeHorizon: 730, riskAppetite: 40 },
    { name: 'Aggressive Growth', description: 'A portfolio with high-risk, high-reward stocks.', capital: 20000, timeHorizon: 180, riskAppetite: 90 }
];

export default function PortfolioTable() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPortfolios = portfolios.filter(portfolio => 
        portfolio.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Table</h2>
            <input 
                type="text" 
                placeholder="Search by name" 
                className="w-full border-2 border-gray-100 rounded-xl p-4 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Capital</th>
                        <th className="py-2">Time Horizon (days)</th>
                        <th className="py-2">Risk Appetite (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPortfolios.map((portfolio, index) => (
                        <tr key={index}>
                            <td className="py-2">{portfolio.name}</td>
                            <td className="py-2">{portfolio.description}</td>
                            <td className="py-2">${portfolio.capital}</td>
                            <td className="py-2">{portfolio.timeHorizon}</td>
                            <td className="py-2">{portfolio.riskAppetite}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <Link to="/createportfolio">
                    <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
                        Create Portfolio
                    </button>
                </Link>
            </div>
        </div>
    );
}
