import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMenuQuery } from '../Api/ProjectApi';
import { addToCart } from '../Context/CartSlice';
import { setMenu, MenuItem } from '../Context/MenuSlice';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetMenuQuery();

  const menuItems: MenuItem[] = data?.items ?? []; 


  useEffect(() => {
    if (menuItems.length > 0) {
      dispatch(setMenu(menuItems));
      console.log("Dispatched setMenu with:", menuItems);
    }
  }, [menuItems, dispatch]);

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (isError || menuItems.length === 0) {
    console.warn("Menu items array is empty. Check API response.");
    return <p>No menu items available.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center mt-20">
      <div className="bg-gray-800 shadow-lg rounded-lg p-4 w-full max-w-md">
        <h2 className="text-2xl font-bold text-left mb-4 text-white">Meny</h2>
        <div className="space-y-4">
          {menuItems.map((item: MenuItem) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold">{item.name} - {item.price} SEK</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => dispatch(addToCart({ ...item, id: Number(item.id), quantity: 1 }))}
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
