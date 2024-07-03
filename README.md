To display the `topperformers` key-value pairs from a `portfolio` object in a table using React, you can follow this approach:

1. **Extract the data**: First, extract the `topperformers` data from the `portfolio` object.
2. **Map the data to table rows**: Use `map` to iterate over the `topperformers` and create table rows.

Here's the code to achieve this:

```jsx
import React from 'react';

const TopPerformersTable = ({ portfolio }) => {
    const { topperformers } = portfolio;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="sticky top-0 bg-gray-50 z-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(topperformers).map(([name, value]) => (
                        <tr key={name}>
                            <td className="px-6 py-4 whitespace-nowrap">{name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopPerformersTable;
```

### Explanation:
1. **Extracting `topperformers`**:
   ```jsx
   const { topperformers } = portfolio;
   ```

2. **Table Structure**:
   - A div with `overflow-x-auto`