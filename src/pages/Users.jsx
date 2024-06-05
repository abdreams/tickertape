import React, { useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import EditUserModal from '../components/EditUserModal';
import { Link } from 'react-router-dom';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search by name"
        className="p-2 mb-4 border border-gray-300 rounded-lg"
      />
    </span>
  );
};

const Users = () => {
  const initialData = React.useMemo(
    () => [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        dob: '1980-01-01',
        totalInvested: 50000,
        totalWorth: 70000,
        profitLoss: 20000,
        portfolios: 3
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        dob: '1985-02-02',
        totalInvested: 30000,
        totalWorth: 45000,
        profitLoss: 15000,
        portfolios: 2
      }
      // Add more users as needed
    ],
    []
  );

  const [data, setData] = useState(initialData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (updatedUser) => {
    setData(data.map(user => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)));
    setIsModalOpen(false);
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Total Invested', accessor: 'totalInvested' },
      { Header: 'Total Worth', accessor: 'totalWorth' },
      { Header: 'Profit/Loss', accessor: 'profitLoss' },
      { Header: 'No. of Portfolios', accessor: 'portfolios' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleEdit(row.original)} className="bg-blue-500 text-white px-2 py-1 rounded">
              Edit
            </button>
            <button className="bg-green-500 text-white px-2 py-1 rounded">View Portfolios</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete User</button>
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
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <Link to="/admin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Admin Dashboard
        </Link>
      </div>
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
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
        <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Users;
