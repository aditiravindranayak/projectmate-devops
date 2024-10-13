import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      window.location.replace('/profile');
    }
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.29.66:4000/login', user)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('auth', token);
        window.location.replace('/select');
      })
      .catch((error) => {
        setError('Failed to login. Please check your credentials.');
      });
  };

  return (
    <div style={{ backgroundImage: 'url("Background.png")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: 17, fontWeight: 'bold', color: '#6a0a7d', fontFamily: 'monospace', marginTop: 25 }}>Login to your Account</h2>
        <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <img style={{ width: 150, height: 100, objectFit: 'cover' }} src="https://cdn-icons-png.freepik.com/512/7910/7910833.png" alt="illustration" />
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#c6a5d1', padding: '10px 15px', borderRadius: 5, marginTop: 30 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ color: 'white', marginVertical: 10, width: 300, fontFamily: 'monospace', fontSize: '17px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}
            />
          </div>
          <div style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#c6a5d1', padding: '10px 15px', borderRadius: 5, marginTop: 30 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ color: 'white', marginVertical: 10, width: 300, fontFamily: 'monospace', fontSize: '17px', border: 'none', outline: 'none', backgroundColor: 'transparent' }}
            />
          </div>
          {error && <p style={{ color: 'red', marginTop: 10, fontFamily: 'monospace' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <p style={{ fontFamily: 'monospace' }}> Keep me logged in</p>
            <p style={{ fontFamily: 'monospace', color: 'gray', fontWeight: 'bold', cursor: 'pointer' }}>Forgot password</p>
          </div>
          <div style={{ marginTop: 50, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
            
            <button
              onClick={handleLogin}
              style={{ width: 100, backgroundColor: '#c6a5d1', borderRadius: 6, padding: 15, border: 'none', color: 'white', fontSize: 16, fontFamily: 'monospace', cursor: 'pointer' }}
            >
              Login
            </button>
            <p style={{ fontWeight: 'bold', textAlign: 'center', color: 'gray', fontSize: 16, fontFamily: 'monospace', marginTop: 12 }}>Don't have an account? <a href="/register" style={{ color: 'gray', fontWeight: 'bold' }}>Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}