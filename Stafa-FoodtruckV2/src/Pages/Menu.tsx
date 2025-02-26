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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={() => dispatch
            (addToCart(item))} />
        ))}
      </div>
    </div>
  );
};

export default Menu;