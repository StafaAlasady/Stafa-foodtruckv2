import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Receipt from './Pages/Receipt'
import Cart from './Pages/Cart'
import Menu from './Pages/Menu'
import Navbar from './Components/Navbar'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
