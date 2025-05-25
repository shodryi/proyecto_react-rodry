import Header from "./components/Header"
import Footer from "./components/Footer"
import Mobs from "./components/Mobs"
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Carrito from './pages/Carrito';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CarritoContext';

function App() {

  return (
    
  <CartProvider>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Mobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/carrito" element={<Carrito />} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  </CartProvider>
  )
}

export default App
