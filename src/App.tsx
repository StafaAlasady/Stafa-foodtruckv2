import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Receipt from './Pages/Receipt'
import Cart from './Pages/Cart'
import Menu from './Pages/Menu'
import Navbar from './Components/Navbar'
import { Provider } from 'react-redux'
import { store } from './Context/Store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
