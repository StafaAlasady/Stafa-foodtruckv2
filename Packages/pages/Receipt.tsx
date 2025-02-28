import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import backgroundImage from '../pages/UI/Assets/black-thread--light--1920x1080.png';

const Receipt: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Location state:", location.state);

  const orderDetails = location.state;

  console.log("Order details:", orderDetails);

  if (!orderDetails || orderDetails.id !== orderId) {
    return (
      <div 
        className="min-h-screen text-white p-6 flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-gray-800 shadow-lg rounded-2xl w-full max-w-2xl p-8 min-h-[500px] flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center">Invalid Order</h1>
          <p className="text-center mt-4">The order details could not be found. Please try again.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Make a New Purchase
          </button>
        </div>
      </div>
    );
  }

  const total = orderDetails.orderValue || 0;
  const moms = total * 0.25;
  const totalWithMoms = total + moms;

  return (
    <div 
      className="min-h-screen text-white p-6 flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-gray-800 shadow-lg rounded-2xl w-full max-w-2xl p-8 min-h-[500px] flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center text-gray-300">Order ID: {orderId}</h2>

        <h1 className="text-2xl font-bold text-center mt-4">Order Receipt</h1>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Items:</h2>
          <ul className="mt-2">
            {orderDetails.items.map((item: any) => (
              <li key={item.id} className="mt-2">
                <p>{item.name} - ${item.price} x {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-lg">
          <p><strong>Subtotal:</strong> ${total.toFixed(2)}</p>
          <p><strong>MOMS (25%):</strong> ${moms.toFixed(2)}</p>
          <p className="text-xl font-bold mt-2"><strong>Total (incl. MOMS):</strong> ${totalWithMoms.toFixed(2)}</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Make a New Purchase
        </button>
      </div>
    </div>
  );
};

export default Receipt;