import React, { useState } from 'react';

export default function CreatePortfolio() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        capital: '',
        timeHorizon: '',
        riskAppetite: 50
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'https://jsonplaceholder.typicode.com/posts'; // Dummy backend URL for demonstration

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                <h1 className='text-5xl font-semibold mb-4'>Create Portfolio</h1>
                <div className='mt-4'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Name of Portfolio</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter the portfolio name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Description</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter the portfolio description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Capital to be Invested (in USD)</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter the capital amount"
                            name="capital"
                            type="number"
                            value={formData.capital}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Time Horizon (days)</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter the investment duration"
                            name="timeHorizon"
                            type="number"
                            value={formData.timeHorizon}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Risk Appetite (%)</label>
                        <input 
                            className='w-full'
                            type="range"
                            name="riskAppetite"
                            min="0"
                            max="100"
                            value={formData.riskAppetite}
                            onChange={handleChange}
                        />
                        <div className='text-center'>{formData.riskAppetite}%</div>
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                        <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
                            Create Portfolio
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
