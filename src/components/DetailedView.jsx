// src/components/DetailedView.js
import React, { useEffect } from 'react';

const DetailedView = ({ sector, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl relative">
        <button
    onClick={onClose}
    className="absolute top-4 right-4 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
    >
    &times;
    </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">{sector.name}</h2>
        <div className="space-y-2">
          <p className="text-sm">{sector.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm"><strong>Last Price:</strong> {sector.value.toFixed(2)}</p>
              <p className="text-sm"><strong>1M Return:</strong> {sector.oneMonthReturn}%</p>
              <p className="text-sm"><strong>1Y Return:</strong> {sector.oneYearReturn}%</p>
              <p className="text-sm"><strong>52W High:</strong> {sector.high}</p>
              <p className="text-sm"><strong>52W Low:</strong> {sector.low}</p>
            </div>
            <div>
              <p className="text-sm"><strong>Constituents:</strong> {sector.constituents}</p>
              <p className="text-sm"><strong>ETFs:</strong> {sector.etfs}</p>
              <p className="text-sm"><strong>M Cap Share:</strong> {sector.marketCapShare}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
