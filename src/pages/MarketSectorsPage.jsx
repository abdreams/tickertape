// src/pages/MarketSectorsPage.js
import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import DetailedView from '../components/DetailedView';

const dummyData = [
  { name: 'NIFTY 50', value: 22550.40, change: 0.27, description: 'Nifty 50 is a well diversified 50 stock index.', oneMonthReturn: 3.11, oneYearReturn: 25.12, high: 23338.70, low: 18531.95, constituents: 50, etfs: 24, marketCapShare: 43.44 },
  { name: 'USD/INR', value: 83.52, change: 0.19, description: 'USD to INR exchange rate.', oneMonthReturn: 0.5, oneYearReturn: 1.2, high: 84, low: 82, constituents: 0, etfs: 0, marketCapShare: 0 },
  { name: 'Gold', value: 7385.95, change: -0.07, description: 'Gold price in INR per gram.', oneMonthReturn: -0.5, oneYearReturn: 2.1, high: 7500, low: 7200, constituents: 0, etfs: 0, marketCapShare: 0 },
  // Add more data as needed
];

const MarketSectorsPage = () => {
  const [selectedSector, setSelectedSector] = useState(null);

  const data = useMemo(() => dummyData, []);
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ value }) => (
        <span className="text-blue-500 hover:text-blue-700 cursor-pointer">
          {value}
        </span>
      ),
    },
    {
      Header: 'Value',
      accessor: 'value',
      Cell: ({ value }) => value.toFixed(2),
    },
    {
      Header: 'Change',
      accessor: 'change',
      Cell: ({ value }) => (
        <span className={value > 0 ? 'text-green-500' : 'text-red-500'}>
          {value > 0 ? `▲ ${value}%` : `▼ ${value}%`}
        </span>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">Market Sectors</h2>
        <input
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="mb-4 p-2 border rounded w-full"
        />
        <table {...getTableProps()} className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="py-4 px-6 border-b text-left text-lg font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSector(row.original)}
                >
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="py-4 px-6 border-b">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedSector && <DetailedView sector={selectedSector} onClose={() => setSelectedSector(null)} />}
    </div>
  );
};

export default MarketSectorsPage;
