import React, { useState, useMemo, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import { useNavigate } from 'react-router-dom';

// Dummy data for stocks
const dummyStockData = [
    { stockname: 'Apple Inc.', stocksymbol: 'AAPL', value: 145.09 },
    { stockname: 'Microsoft Corp.', stocksymbol: 'MSFT', value: 299.79 },
    { stockname: 'Amazon.com Inc.', stocksymbol: 'AMZN', value: 3478.05 },
    { stockname: 'Google LLC', stocksymbol: 'GOOGL', value: 2729.89 },
    { stockname: 'Facebook Inc.', stocksymbol: 'FB', value: 355.64 },
  ];

const FETCH_URL = 'https://dummyapi.io/data/api/stocks';  // Replace with actual endpoint

const StockUniverse = () => {
  const [data, setData] = useState(dummyStockData);
  const navigate = useNavigate();

  useEffect(() => {
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
    { Header: 'Stock Name', accessor: 'stockname' },
    { Header: 'Stock Symbol', accessor: 'stocksymbol' },
    { Header: 'Value', accessor: 'value' },
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

  const handleRowClick = (stockSymbol) => {
    navigate(`/stockdetails/${stockSymbol}`);
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
                <tr {...row.getRowProps()} className="hover:bg-gray-100" onClick={() => handleRowClick(row.original.stocksymbol)}>
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
    </div>
  );
};

export default StockUniverse;
