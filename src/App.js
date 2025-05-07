import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for v6
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';
import Orders from './components/Orders';
import PaymentPage from './components/PaymentPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes> {/* Use Routes for v6 */}
        <Route path="/" element={<ProductList />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<Default />} /> {/* Default route for unmatched paths */}
      </Routes>
      <Modal />
    </Router>
  );
}

export default App;
