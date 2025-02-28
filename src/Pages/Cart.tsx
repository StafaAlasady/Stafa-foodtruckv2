import React from 'react';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Context/Store';
import { removeFromCart, clearCart } from '../Context/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/black-thread--light--1920x1080.png';
import { usePlaceOrderMutation } from '../Api/ProjectApi';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const [placeOrder] = usePlaceOrderMutation();

  const handleOrder = async () => {
    if (cart.length === 0) return;
  
    const itemIds = cart.map(item => item.id);
  
    console.log('Transformed cart data (item IDs):', JSON.stringify(itemIds, null, 2));
  
    try {
      const response = await placeOrder({ items: itemIds }).unwrap();
  
      console.log('Full response from placeOrder:', response);
  
      const { order } = response;
      if (!order) {
        throw new Error('Order object is missing in the response');
      }
  
      const { id } = order;
      if (!id) {
        throw new Error('Order ID is missing in the response');
      }
  
      dispatch(clearCart());
  
      navigate(`/eta/${id}`);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    }
  };
  

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6 text-white"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="w-full max-w-lg bg-gray-800 shadow-xl rounded-2xl p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        {cart.length > 0 ? (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={() => dispatch(removeFromCart(item.id))} />
              ))}
            </div>
            <p className="mt-4 text-xl font-semibold">Total: ${total}</p>
            <button onClick={handleOrder} className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Place Order
            </button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
        <Link to="/" className="mt-4 block w-full text-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default Cart;
