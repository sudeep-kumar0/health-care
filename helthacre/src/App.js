import './App.css';
import Home from './Home';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Header from './Header';

import { useSelector } from 'react-redux';
import React from 'react';
import AdminPanel from './AdminPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import Cart from './Cart';
import PaymentPage from './PaymentPage';

function App() {
  const users = useSelector(state => state.usersData);

  return (
    <Router>
      <div className="App">
        <Header />
     
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/Admin" element={<AdminPanel/>} />

          <Route path='/login'  element={<LoginPage/>} />

          <Route path="/cart" element={<Cart />} /> {/* Add Cart Page Route */}

          <Route path="/payment" element={<PaymentPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
