import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from './reducer';
import './Cart.css';

function Cart() {
  const cartItems = useSelector(state => state.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const handleRemove = (heading) => {
    // Dispatch action with the heading of the item to remove
    dispatch(removeFromCart({ heading }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setQuantities({});
  };

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setQuantities(prevQuantities => ({ ...prevQuantities, [id]: quantity }));
  };

  const calculateTotalPrice = (item) => {
    const quantity = quantities[item.id] || 1;
    const price = parseFloat(item.Price.replace('$', ''));
    return quantity * price;
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = calculateTotalPrice(item);
      return total + itemTotal;
    }, 0);
  };

  const handleProceedToPayment = () => {
    navigate('/payment'); // Redirect to payment page
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Appointment</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="item-img">
                <img src={item.imgSrc} alt={item.heading} />
              </div>
              <div className="item-details">
                <h2>{item.heading}</h2>
                <p className="item-price">Price: {item.Price}</p>
                <div className="item-quantity">
                  <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    min="1"
                  />
                </div>
                <p className="item-total">Total: ${calculateTotalPrice(item).toFixed(2)}</p>
              </div>
              <button
                  className="remove-button"
                  onClick={() => handleRemove(item.heading)} // Pass heading to remove item
                >
                  Remove
                </button>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Grand Total: ${calculateGrandTotal().toFixed(2)}</h3>
            <button className="clear-button" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="proceed-button" onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
