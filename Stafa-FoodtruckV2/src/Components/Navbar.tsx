import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Context/Store';

const Navbar: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <div className="text-xl font-bold">
        <Link to="/">My Restaurant</Link>
      </div>
      <Link to="/cart" className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {cart.length}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Navbar;