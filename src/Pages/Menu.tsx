import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMenuQuery } from '../Api/ProjectApi';  // Assuming you're using this to fetch menu items
import { addToCart } from '../Context/CartSlice';
import { setMenu, MenuItem } from '../Context/MenuSlice';
import backgroundImage from '../assets/black-thread--light--1920x1080.png';

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetMenuQuery();

  const menuItems: MenuItem[] = data?.items ?? []
  const dips = data?.items?.filter((item: { type: string; }) => item.type === 'dip') ?? [];
  const maindish = data?.items?.filter((item: { type: string; }) => item.type === 'wonton') ?? [];

  useEffect(() => {
    if (menuItems.length > 0) {
      dispatch(setMenu(menuItems));
    }
  }, [menuItems, dispatch]);

  if (isLoading) {
    return <p>Loading menu...</p>;
  }

  if (isError || menuItems.length === 0) {
    return <p>No menu items available.</p>;
  }

 
  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart({ 
      id: Number(item.id), 
      name: item.name, 
      price: item.price, 
      quantity: 1, 
      type: item.type,
      description: item.description,
      ingredients: item.ingredients,
    }));
  };


  const handleDipSelection = (dip: { id: number; name: string; price: number }) => {
    dispatch(addToCart({ ...dip, id: Number(dip.id), quantity: 1 }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6 text-white"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-lg bg-gray-800 shadow-xl rounded-2xl p-6 min-h-[500px] flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-left mb-4 text-white">Meny</h2>
        <div className="space-y-4 flex-grow overflow-y-auto">
          {maindish.map((item: MenuItem) => (
            <div key={item.id} className="border-b pb-2">
              <button onClick={() => handleAddToCart(item)}
                className="w-full text-left flex justify-between items-center hover:bg-gray-700 transition-colors p-2 rounded">
                <span className="text-lg font-semibold">{item.name} - {item.price} SEK</span>
              </button>
              <p className="text-sm text-gray-400 mt-1">{item.ingredients?.join(', ') || 'No ingredients listed'}</p>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Dipsåser</h3>
            <div className="grid grid-cols-3 gap-2">
              {dips.map((dip: { id: any; name: any; price: any; }) => (
                <button key={dip.id} onClick={() => handleDipSelection(dip)}
                  className="py-2 px-4 rounded bg-gray-500 text-white hover:bg-gray-700 transition-colors">
                  {dip.name} - {dip.price} SEK
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

