import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Catalogo</Link>
        <Link to="/cart">Carrinho</Link>
      </nav>
      
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
