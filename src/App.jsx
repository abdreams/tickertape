// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
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
// import ChatbotComponent from './components/ChatbotComponent';
import StockUniverse from './pages/StockUniverse';
import StockDetails from './pages/StockDetails';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
        <Router>
            <Routes>
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/createportfolio" element={<CreatePortfolio />} />
                <Route path="/market-sectors" element={<MarketSectorsPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/user/:userId" element={<UserDetailPage />} />
                <Route path="/editstocks" element={<EditStockUniverse />} />
                {/* <Route path="/chatbot" element={<ChatbotComponent />} /> */}
                <Route path="/stocks" element={<StockUniverse />} />
                <Route path="/stockdetails/:stocksymbol" element={<StockDetails />} />
            </Routes>
        </Router>
      <StockMarquee />
      <Navbar />
      <MarketStatus />
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          <MarketSectors />
          <div className="flex justify-between mt-6">
            <div className="w-2/3 mr-6">
              <GetStarted />
              <TodaysStocks />
            </div>
            <div className="w-1/3">
              <News />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
