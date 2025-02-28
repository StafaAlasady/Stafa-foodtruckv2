import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store/Store';
import { ShoppingBag } from 'lucide-react';

const Navbar: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 bg-white shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">🍔 Stafa Foodtruck</Link>
      </div>
      <Link to="/cart" className="relative">
        <ShoppingBag size={28} strokeWidth={2} />
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Navbar;