To set the default sorting by `oldAllocationShares` in ascending order when the table renders, you need to specify the initial sorting state in the `initialState` property of the `useTable` hook. Here's how you can do it:

### Code Changes

1. **Modify the `useTable` hook**:
   Set the `initialState` to include `sortBy` with the desired column and order.

```javascript
const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
} = useTable(
    {
        columns,
        data,
        initialState: {
            pageIndex: 0,
            pageSize: 10,
            sortBy: [
                {
                    id: 'oldAllocationShares', // Column accessor for sorting
                    desc: false,              // `false` for ascending order
                },
            ],
        },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
);
```

### Full `RebalancePortfolio` Component with Changes

Here's the full updated component with the changes for setting the default sort:

```javascript
import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import Loader from '../components/Loader';
import Select from 'react-select';

const RebalancePortfolio = () => {
    const navigate = useNavigate();
    const { portfolioId } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [stockOptions, setStockOptions] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [capital, setCapital] = useState(0);
    const [totalNewAllocation, setTotalNewAllocation] = useState(0);
    const [totalAvailableCash, setTotalAvailableCash] = useState(0);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummy-url.com/api/rebalanced-portfolio/${portfolioId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            const transformedData = Object.entries(result.allocation).map(([symbol, details]) => ({
                stockSymbol: symbol,
                oldAllocationShares: parseFloat(details.oldAllocationShares),
                newAllocationPercent: parseFloat(details.newAllocationPercent),
                price: parseFloat(details.price),
                capitalInvested: parseFloat(details.price) * (parseFloat(details.newAllocationPercent) / 100) * (parseFloat(result.capital) / parseFloat(details.price)),
            }));
            setData(transformedData);
            setCapital(parseFloat(result.capital));
            calculateTotals(transformedData, parseFloat(result.capital));
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data, displaying dummy data instead.');
            const dummyData = [
                { stockSymbol: 'AAPL', oldAllocationShares: 10, newAllocationPercent: 5, price: 113.79, capitalInvested: 568.95 },
                { stockSymbol: 'GOOGL', oldAllocationShares: 10, newAllocationPercent: 5, price: 113.79, capitalInvested: 568.95 },
                // Add more dummy data if needed
            ];
            setData(dummyData);
            setCapital(1000);
            calculateTotals(dummyData, 1000);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = (data, capital) => {
        const totalNewAllocation = data.reduce((acc, stock) => acc + stock.newAllocationPercent, 0);
        const totalAvailableCash = capital - data.reduce((acc, stock) => acc + (stock.price * (stock.newAllocationPercent / 100) * (capital / stock.price)), 0);
        setTotalNewAllocation(totalNewAllocation);
        setTotalAvailableCash(totalAvailableCash);
    };

    const fetchStockOptions = async () => {
        try {
            const response = await fetch('https://dummy-url.com/api/stock-options');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            const options = result.map(stock => ({
                value: stock.stocksymbol,
                label: stock.stocksymbol,
                price: stock.price,
            }));
            setStockOptions(options);
        } catch (error) {
            console.error('Error fetching stock options:', error);
            toast.error('Error fetching stock options.');
        }
    };

    useEffect(() => {
        fetchData();
        fetchStockOptions