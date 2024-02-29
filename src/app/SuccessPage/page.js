"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './successStyles.css';


export const SuccessPage = () => {

  const router = useRouter(); // Get the router instance
  

    // Function to handle button click
  const handleClick = () => {
    // Redirect to another page when the button is clicked
    router.push('/ContentPage');
  };

  return (
    <div className="successContainer">
        <h1>OTP Verified Successfully!</h1>
        <p>Congratulations! You have successfully subscribed to our Tech News App.</p>
        <p>You can now access all the new content.</p>
        <button type="submit" className='successButton' onClick={handleClick}>Contents Page</button>
    </div>
  )
};


export default SuccessPage;

