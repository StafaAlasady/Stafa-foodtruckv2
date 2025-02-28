import { Route, Routes } from 'react-router-dom';
import Receipt from '../Packages/pages/Receipt';
import Cart from '../Packages/pages/Cart';
import Menu from '../Packages/pages/Menu';
import Navbar from '../Packages/base/Components/Navbar';
import { Provider } from 'react-redux';
import store from '../Packages/core/store/Store';
import ETA from '../Packages/pages/ETA';

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
