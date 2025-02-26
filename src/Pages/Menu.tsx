import React, { useEffect, useState } from 'react';
import MenuItem from '../Components/MenuItem';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Context/CartSlice';
import { fetchMenuItems } from '../Api/ProjectApi';

interface MenuItemType {
  id: number;
  name: string;
  price: number;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  console.log('Menu items:', menuItems);
  console.log('Loading:', setLoading);
  console.log('error:', setError);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        console.log('Fetching menu items...');
        const items = await fetchMenuItems();
        console.log('Fetched items:', items);
        setMenuItems(items);
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
        setError('Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-green-600 p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-6">Menu</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <p className="text-lg">💰 {item.price} SEK</p>
            <button 
              onClick={() => dispatch(addToCart(item))} 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Menu;

