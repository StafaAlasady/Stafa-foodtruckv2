import React from 'react';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Context/Store';
import { removeFromCart } from '../Context/CartSlice';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} onRemove={() => dispatch(removeFromCart(item.id))} />
            ))}
          </div>
          <p className="mt-4 text-xl font-semibold">Total: ${total}</p>
          <Link
            to="/receipt"
            className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Place Order
          </Link>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Back to Menu
      </Link>
    </div>
  );
};

export default Cart;