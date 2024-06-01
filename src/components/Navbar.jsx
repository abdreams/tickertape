// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-600 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
        Wells Fargo
      </div>
      <div className="space-x-4">
        <button className="text-white">Home</button>
        <button className="text-white">Portfolio</button>
        <button className="text-white">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
