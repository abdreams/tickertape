// src/components/MarketStatus.js


const dummyData = {
  nifty50: 22530.70,
  sensex: 73961.31,
  fearIndex: "Extreme Fear", // Options: "Fear", "No Fear", "Extreme Fear"
  weeklyStatus: ["Fear", "No Fear", "Extreme Fear", "Fear", "Fear"], // Weekly fear status
};

const MarketStatus = () => {
  const getColor = (status) => {
    switch (status) {
      case "Fear":
        return "text-yellow-400";
      case "No Fear":
        return "text-green-400";
      case "Extreme Fear":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const getPieColor = (status) => {
    switch (status) {
      case "Fear":
        return "bg-yellow-400";
      case "No Fear":
        return "bg-green-400";
      case "Extreme Fear":
        return "bg-red-400";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="bg-gray-900 p-6 text-white flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full max-w-4xl">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 p-4 rounded">
            <span>NIFTY 50</span>
            <span className="block">{dummyData.nifty50.toFixed(2)}</span>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <span>SENSEX</span>
            <span className="block">{dummyData.sensex.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {dummyData.weeklyStatus.map((status, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full ${getPieColor(status)}`}
                style={{ clipPath: "circle(50% at 50% 50%)" }}
              ></div>
              <span className="text-xs mt-1">
                {["MON", "TUE", "WED", "THU", "FRI"][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-2xl text-center">
        <span>The market is in </span>
        <span className={`font-bold ${getColor(dummyData.fearIndex)} text-3xl`}>
          {dummyData.fearIndex} zone
        </span>
      </div>
      {/* <MarketSectors /> */}
    </div>
  );
};

export default MarketStatus;