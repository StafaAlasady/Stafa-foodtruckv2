import React from 'react';
import { Link } from 'react-router-dom';

const Receipt: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Receipt</h1>
      <p>Thank you for your order!</p>
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Back to Menu
      </Link>
    </div>
  );
};

export default Receipt;