// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarketStatus from './components/MarketStatus';
import MarketSectors from './components/MarketSectors';
import GetStarted from './components/GetStarted';
import News from './components/News';
import TodaysStocks from './components/TodaysStocks';
import StockMarquee from './components/StockMarquee';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import CreatePortfolio from './components/CreatePortfolio';
import MarketSectorsPage from './pages/MarketSectorsPage';
import Users from './pages/Users';
import AdminDashboard from './pages/AdminDashboard';
import UserDetailPage from './pages/UserDetailPage';
import EditStockUniverse from './pages/EditStockUniverse';
import ChatbotComponent from './components/ChatbotComponent';
import StockUniverse from './pages/StockUniverse';
import StockDetails from './pages/StockDetails';
import StockComparison from './pages/StockComparision';
import RebalancePortfolio from './pages/RebalancePortfolio';

const isDarkMode=true;
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/createportfolio" element={<CreatePortfolio />} />
          <Route path="/market-sectors" element={<MarketSectorsPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user/:userId" element={<UserDetailPage />} />
          <Route path="/editstocks" element={<EditStockUniverse />} />
          <Route path="/chatbot" element={<ChatbotComponent />} />
          <Route path="/stocks" element={<StockUniverse />} />
          <Route path="/stockdetails/:stocksymbol" element={<StockDetails />} />
          <Route path="/stockcomparision" element={<StockComparison />} />
          <Route path="/rebalance" element={<RebalancePortfolio />} />
        </Routes>
      </Router>
      <StockMarquee />
      <Navbar />
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen`}>
        <MarketStatus isDarkMode={isDarkMode} />
        <div className="p-6">
          <div className="max-w-5xl mx-auto">
            <MarketSectors isDarkMode={isDarkMode} />
            <div className="flex justify-between mt-6">
              <div className="w-2/3 mr-6">
                <GetStarted isDarkMode={isDarkMode} />
                <TodaysStocks isDarkMode={isDarkMode} />
              </div>
              <div className="w-1/3">
                <News isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
