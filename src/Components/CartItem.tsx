import React from 'react';


interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    type?: string;
    description?: string; 
    ingredients?: string[];
  };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-600">${item.price} x {item.quantity}</p>
      {item.description && <p>{item.description}</p>} {/* Add description if available */}
      {item.ingredients && item.ingredients.length > 0 && (
        <ul>
          {item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}
      <button
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
