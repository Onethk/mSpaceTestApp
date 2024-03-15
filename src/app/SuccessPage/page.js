"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './successStyles.css';
import { useSelector, useDispatch } from 'react-redux';



export const SuccessPage = () => {

  const router = useRouter(); // Get the router instance
  const dispatch = useDispatch();


  const statusCode = useSelector((state) => state.successStatus);
  console.log("Status",statusCode);

  useEffect(() => {
    // Redirect to another page if statusCode is not "S1000"
    if (statusCode !== "S1000") {
      router.push('/form'); // Redirect to an error page
    }
  }, [statusCode, router]);


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

