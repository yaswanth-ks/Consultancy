import React, { useState } from 'react';
import styled from 'styled-components';

export default function AuthModal({ onClose, onSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:8000'; // Adjust this to match your backend

  const handleAuth = async () => {
    // Validation
    if (!email.includes('@')) return setError('Invalid email format');
    if (!/^(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(password)) {
      return setError('Password must be at least 8 chars and include number & special character');
    }

    const endpoint = isSignup ? '/signup' : '/login';
    const body = isSignup ? { name, email, password } : { email, password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      onSuccess(data.user || { name: name || 'User', email }); // Pass user up
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ModalWrapper>
      <div className="modal-content">
        <h5>{isSignup ? "Sign Up" : "Login"}</h5>
        {isSignup && <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button onClick={handleAuth}>{isSignup ? "Sign Up" : "Login"}</button>
        <p onClick={() => { setIsSignup(!isSignup); setError(''); }}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
        <span className="close" onClick={onClose}>×</span>
      </div>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    min-width: 320px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }

  input {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  button {
    width: 100%;
    margin-top: 15px;
    background-color: var(--mainBlue);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
  }

  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
  }

  .close {
    position: absolute;
    top: 10px; right: 15px;
    font-size: 20px;
    cursor: pointer;
  }

  p {
    margin-top: 10px;
    color: var(--mainBlue);
    text-align: center;
    cursor: pointer;
  }
`;
