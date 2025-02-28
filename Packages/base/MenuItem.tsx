import React from 'react';

export interface MenuItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    type?: string; 
    description?: string;
    ingredients?: string[];
  };
  onAddToCart: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-600">${item.price}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;