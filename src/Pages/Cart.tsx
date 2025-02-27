import React from 'react';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Context/Store';
import { removeFromCart, clearCart } from '../Context/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { usePlaceOrderMutation } from '../Api/ProjectApi';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const [placeOrder, { isLoading, isError }] = usePlaceOrderMutation();

  const handleOrder = async () => {
    if (cart.length === 0) return;

    try {
      const orderData = { items: cart };
      const response = await placeOrder(orderData).unwrap(); // API request to place order
      
      dispatch(clearCart()); // Clear the cart after order is placed
      navigate(`/eta/${response.id}`); // Redirect to ETA page with orderId
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

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

          {/* Place Order Button */}
          <button
            onClick={handleOrder}
            disabled={isLoading}
            className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isLoading ? "Placing Order..." : "Place Order"}
          </button>

          {isError && <p className="text-red-500 mt-2">Failed to place order. Try again.</p>}
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Back to Menu Link */}
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Back to Menu
      </Link>
    </div>
  );
};

export default Cart;
