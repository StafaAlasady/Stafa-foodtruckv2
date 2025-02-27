import { Route, Routes } from 'react-router-dom';
import Receipt from './Pages/Receipt';
import Cart from './Pages/Cart';
import Menu from './Pages/Menu';
import Navbar from './Components/Navbar';
import { Provider } from 'react-redux';
import store from './Context/Store';
import ETA from './Pages/ETA';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/eta/:orderId" element={<ETA />} />
        <Route path="/receipt/:orderId" element={<Receipt />} />
      </Routes>
    </Provider>
  );
};

export default App;
