"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './unsubStyles.css';


export const UnsubscriptionPage = () => {

    const router = useRouter(); // Get the router instance

    const handleClick = () => {
        // Redirect to another page when the button is clicked
        router.push('/Bannerpage');
      };

  return (
    <div>
        <div className="unsubContainer">
        <h1>Unsubscription Successful</h1>
        <p>We're sorry to see you go! Your subscription has been successfully canceled.</p>
        {/* <p>You can now access all the new content.</p> */}
        <button type="submit" className='unsubButton' onClick={handleClick}>Home Page</button>
    </div>
    </div>
  )
}
export default UnsubscriptionPage;
