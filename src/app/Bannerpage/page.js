"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './bannerstyles.css';
import Form from '../form/page';

export const BannerPage = () => {
  const router = useRouter();

  const handleGetStarted1 = () => {
    // Redirect to another page when the button is clicked
    router.push('/form');
  };
  const handleGetStarted2 = () => {
    // Redirect to another page when the button is clicked
    router.push('/LoginForm');
  };

  return (
    <div className="container">
      <div className="message">
        <h1>Tech News App</h1>
        <p>Welcome, Subscribe to our app for cutting-edge tech knowledge!</p>
        <p className='descriptionBanner'>
            <b>Subscription Charging Details: <br></br>
            Daily Rs 5.00 + Tax<br></br>
            Monthly Rs 150.00 + Tax</b>
        </p>
        <br></br>
        <button onClick={handleGetStarted1} className='startButton'>Sign Up</button>
        <br></br>
        <br></br>
        <button onClick={handleGetStarted2} className='startButton'>Login</button>
      </div>
    </div>
  );
};

export default BannerPage;
