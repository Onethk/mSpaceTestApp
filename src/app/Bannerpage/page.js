"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './bannerstyles.css';
import Form from '../form/page';

export const BannerPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    // Redirect to another page when the button is clicked
    router.push('/form');
  };

  return (
    <div className="container">
      <div className="message">
        <h1>Tech News App</h1>
        <p>Welcome, Subscribe to our application to enhance your knowledge.</p>
        <p className='descriptionBanner'>
            <b>Subscription Charging Details: <br></br>
            Daily Rs 5.00 + Tax<br></br>
            Monthly Rs 150.00 + Tax</b>
        </p>
        <br></br>
        <button onClick={handleGetStarted} className='startButton'>Get Started</button>
      </div>
    </div>
  );
};

export default BannerPage;
