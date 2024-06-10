import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';

// Define the dummy URLs
const FETCH_URL = 'https://dummyapi.io/data/api/stocks';  // Replace with actual endpoint
const UPDATE_URL = 'https://dummyapi.io/data/api/updateStock';  // Replace with actual endpoint

const EditStockUniverse = () => {
  const [data, setData] = useState([]);
  const [editingStock, setEditingStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch stock data from the backend
    const fetchStockData = async () => {
      try {
        const response = await fetch(FETCH_URL);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const columns = useMemo(() => [
    { Header: 'Stock Name', accessor: 'name' },
    { Header: 'Stock Symbol', accessor: 'symbol' },
    { Header: 'Sector', accessor: 'sector' },
    { Header: 'Opening Value', accessor: 'openingValue' },
    { Header: 'Closing Value', accessor: 'closingValue' },
    { Header: '% Change', accessor: 'change', Cell: ({ row }) => {
      const change = ((row.original.closingValue - row.original.openingValue) / row.original.openingValue) * 100;
      return `${change.toFixed(2)}%`;
    }},
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button onClick={() => handleEdit(row.original)} className="bg-blue-500 text-white px-2 py-1 rounded">
          Edit
        </button>
      )
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, globalFilter }
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const handleEdit = (stock) => {
    setEditingStock(stock);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedStock) => {
    try {
      const response = await fetch(UPDATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStock)
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      const updatedData = data.map(stock => stock.symbol === updatedStock.symbol ? updatedStock : stock);
      setData(updatedData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Universe of Stocks</h2>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search stocks..."
        className="mb-4 p-2 border rounded"
      />
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
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
      <div className="flex justify-between mt-4">
        <button onClick={previousPage} disabled={!canPreviousPage} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg">
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={nextPage} disabled={!canNextPage} className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg">
          Next
        </button>
      </div>
      {isModalOpen && (
        <EditStockModal
          stock={editingStock}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const EditStockModal = ({ stock, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    openingValue: stock.openingValue,
    closingValue: stock.closingValue
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...stock, ...formData });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Stock</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Opening Value</label>
            <input
              type="number"
              name="openingValue"
              value={formData.openingValue}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Closing Value</label>
            <input
              type="number"
              name="closingValue"
              value={formData.closingValue}
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

export default EditStockUniverse;
