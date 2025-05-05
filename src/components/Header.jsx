import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white text-center p-3">
      <h1>Financial Tracker</h1>
      <nav className="mt-2">
        <Link to="/" className="text-white mx-2">Home</Link>
        <Link to="/expenses" className="text-white mx-2">Expenses</Link>
        <Link to="/budget" className="text-white mx-2">Budget</Link>
      </nav>
    </header>
  );
};

export default Header;