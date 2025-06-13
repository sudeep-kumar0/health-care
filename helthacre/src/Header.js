import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaChevronRight, FaCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Get cart items count from Redux state
  const cartItems = useSelector((state) => state.cartData);
  const cartCount = cartItems.length;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
        <div className="container">
          <a className="navbar-brand mx-auto d-lg-none" href="index.html">
            Medic Care
            <strong className="d-block">Health Specialist</strong>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav mx-auto"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '40px',
              }}
            >
              <li className="nav-item active">
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                  }}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#timeline">
                  Timeline
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#booking"
                  id="Booktext"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  BookForm
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '24px',
                      height: '24px',
                    }}
                  >
                    <FaCircle
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        fontSize: '24px',
                        color: 'lightgray',
                      }}
                    />
                    <FaChevronRight
                      style={{
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        fontSize: '14px',
                        color: 'black',
                      }}
                    />
                  </div>
                </a>
              </li>

              <a
                className="navbar-brand d-none d-lg-block"
                href="index.html"
                style={{ color: 'var(--primary-color)', fontSize: '28px' }}
              >
                Medic Care
                <strong className="d-block">Health Specialist</strong>
              </a>

              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Our Treatment
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    textDecoration: 'none',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  <FaCalendarCheck />
                  Book Appointment
                  {cartCount > 0 && (
                    <span
                      style={{
                        backgroundColor: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 8px',
                        fontSize: '12px',
                        marginLeft: '5px',
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              <Link
                id="loginbtn"
                to="/login"
                onClick={() => console.log('Navigating to LoginPage...')}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Login
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
