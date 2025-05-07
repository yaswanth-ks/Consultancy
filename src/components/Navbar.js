import React, { Component } from 'react';
import { Link } from 'react-router-dom';  
import logo from '../logo.svg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import AuthModal from './AuthModal';

export default class Navbar extends Component {
  state = {
    isAuthModalOpen: false,
    user: null, // or { name: 'John' }
    showDropdown: false
  };

  componentDidMount() {
    // Check if the user data is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.setState({ user: JSON.parse(storedUser) });
    }
  }

  handleLoginClick = () => {
    this.setState({ isAuthModalOpen: true });
  };

  handleLogout = () => {
    // Clear user data from state and localStorage
    this.setState({ user: null, showDropdown: false });
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  handleAuthSuccess = (userData) => {
    // Save the user data to localStorage and set it in state
    localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
    this.setState({ user: userData, isAuthModalOpen: false });
  };

  render() {
    const { user, isAuthModalOpen, showDropdown } = this.state;

    return (
      <>
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
          <Link to='/'>
            <img src={logo} alt="store" className="navbar-brand" />
          </Link>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
              <Link to="/" className="nav-link">YA-Lights</Link>
            </li>
          </ul>

          <Link to="/cart" className="ml-auto mr-2">
            <ButtonContainer>
              <i className="fas fa-cart-plus"></i> my cart
            </ButtonContainer>
          </Link>

          {user ? (
            <div className="dropdown">
              <div
                className="profile-circle"
                onClick={() => this.setState({ showDropdown: !showDropdown })}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              {showDropdown && (
                <div className="dropdown-menu show p-3">
                  <p className="mb-1 text-center">{user.name}</p>
                  <Link to="/orders">
                    <button className="btn btn-secondary btn-sm mb-2 w-100">
                      View Orders
                    </button>
                  </Link>
                  <button className="btn btn-danger btn-sm w-100" onClick={this.handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ButtonContainer onClick={this.handleLoginClick}>
              Login
            </ButtonContainer>
          )}
        </NavWrapper>

        {isAuthModalOpen && (
          <AuthModal onClose={() => this.setState({ isAuthModalOpen: false })} onSuccess={this.handleAuthSuccess} />
        )}
      </>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  .profile-circle {
    width: 35px;
    height: 35px;
    background: var(--mainWhite);
    color: var(--mainBlue);
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
  }
  .dropdown-menu {
    min-width: 200px;  
    background-color: var(--mainWhite);  
    border-radius: 8px; 
  }
  .dropdown-menu button {
    width: 100%; 
  }
`;
