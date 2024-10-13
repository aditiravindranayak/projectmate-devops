import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Select() {
  const [option, setOption] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('auth');
      if (typeof token === 'string') {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      }
    };
    fetchUser();
  }, []);

  const updateUserGender = async () => {
    try {
      const response = await axios.put(`http://192.168.29.66:4000/users/${userId}/gender`, {
        gender: option
      });

      console.log(response.data);

      if (response.status === 200) {
        window.location.replace("/tabs");
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#E0BBE4', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '30px', borderRadius: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: "bold", color: "#6a0a7d", fontFamily: "monospace", marginBottom: '35px' }}>Select your gender</h2>
        <div
          onClick={() => setOption('male')}
          style={{
            backgroundColor: option === 'male' ? '#D8BFD8' : '#8A2BE2', // Change background color when selected to light purple, unselected to dark purple
            padding: '20px',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '25px',
            borderRadius: '10px',
            borderColor: option === 'male' ? 'black' : 'transparent',
            borderWidth: option === 'male' ? '5px' : '0'
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '20px', fontWeight: 700 }}>I am a Man.</span>
          <img
            style={{ width: '70px', height: '70px' }}
            src="https://cdn-icons-png.flaticon.com/512/3233/3233508.png"
            alt="male"
          />
        </div>

        <div
          onClick={() => setOption('female')}
          style={{
            backgroundColor: option === 'female' ? '#D8BFD8' : '#8A2BE2', // Change background color when selected to light purple, unselected to dark purple
            padding: '20px',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '25px',
            borderRadius: '10px',
            borderColor: option === 'female' ? 'black' : 'transparent',
            borderWidth: option === 'female' ? '5px' : '0'
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '20px', fontWeight: 700 }}>I am a woman.</span>
          <img
            style={{ width: '70px', height: '70px' }}
            src="https://cdn-icons-png.flaticon.com/256/1164/1164094.png"
            alt="female"
          />
        </div>

        <div
          onClick={() => setOption('nonbinary')}
          style={{
            backgroundColor: option === 'nonbinary' ? '#D8BFD8' : '#8A2BE2', // Change background color when selected to light purple, unselected to dark purple
            padding: '20px',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '25px',
            borderRadius: '10px',
            borderColor: option === 'nonbinary' ? 'black' : 'transparent',
            borderWidth: option === 'nonbinary' ? '5px' : '0'
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '20px', fontWeight: 700 }}>I am non-binary.</span>
          <img
            style={{ width: '70px', height: '70px' }}
            src="https://cdn-icons-png.flaticon.com/512/7326/7326569.png"
            alt="nonbinary"
          />
        </div>
      </div>

      {option && (
        <button
          onClick={updateUserGender}
          style={{
            backgroundColor: 'black',
            padding: '15px 40px',
            borderRadius: '4px',
            border: 'none',
            color: 'white',
            fontFamily: 'monospace',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Done
        </button>
      )}
    </div>
  )
}
