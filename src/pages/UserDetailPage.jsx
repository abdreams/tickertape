import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

const UserDetailPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const user = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        dob: '1980-01-01',
        portfolios: [
            {
                id: 1,
                name: 'Tech Portfolio',
                riskAppetite: 80,
                capital: 30000,
                allocation: {
                    sectors: { Tech: 60, Finance: 20, Health: 20 },
                    stocks: { AAPL: 40, MSFT: 20, JPM: 10, PFE: 10, GOOGL: 20 }
                }
            },
            {
                id: 2,
                name: 'Balanced Portfolio',
                riskAppetite: 50,
                capital: 40000,
                allocation: {
                    sectors: { Tech: 40, Finance: 30, Health: 30 },
                    stocks: { AAPL: 20, MSFT: 10, JPM: 20, PFE: 20, GOOGL: 30 }
                }
            }
        ]
    };

    const [portfolios, setPortfolios] = useState(user.portfolios);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (portfolio) => {
        setSelectedPortfolio(portfolio);
        setIsModalOpen(true);
    };

    const handleSave = (updatedPortfolio) => {
        setPortfolios(portfolios.map(portfolio => (portfolio.id === selectedPortfolio.id ? { ...portfolio, ...updatedPortfolio } : portfolio)));
        setIsModalOpen(false);
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Risk Appetite', accessor: 'riskAppetite', Cell: ({ value }) => `${value}%` },
            { Header: 'Capital', accessor: 'capital' },
            { Header: 'Sector Allocation', accessor: 'allocation.sectors', Cell: ({ value }) => JSON.stringify(value) },
            { Header: 'Stock Allocation', accessor: 'allocation.stocks', Cell: ({ value }) => JSON.stringify(value) },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button onClick={() => handleEdit(row.original)} className="bg-blue-500 text-white px-2 py-1 rounded">
                            Edit
                        </button>
                    </div>
                )
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data: portfolios });

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{user.name}'s Portfolios</h2>
                <div className="container mx-auto p-6">
                    <div className="flex justify-end">
                        <button onClick={() => navigate('/editstocks')} className="bg-blue-500 text-white px-4 py-2 mr-10 rounded-lg">
                            Edit Stocks
                        </button>
                        <button onClick={() => navigate('/editstocks')} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Go to User Portfolio Dashboard
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4 whitespace-no-wrap border-b border-gray-300"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <EditPortfolioModal
                    portfolio={selectedPortfolio}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

const EditPortfolioModal = ({ portfolio, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: portfolio.name,
        riskAppetite: portfolio.riskAppetite,
        capital: portfolio.capital
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSliderChange = (e) => {
        setFormData({ ...formData, riskAppetite: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Portfolio</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Risk Appetite</label>
                        <input
                            type="range"
                            name="riskAppetite"
                            min="0"
                            max="100"
                            value={formData.riskAppetite}
                            onChange={handleSliderChange}
                            className="w-full"
                        />
                        <div className="text-center">{formData.riskAppetite}%</div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Capital</label>
                        <input
                            type="number"
                            name="capital"
                            value={formData.capital}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetailPage;
