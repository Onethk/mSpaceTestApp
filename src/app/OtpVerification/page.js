"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './otpStyles.css';

// Define the OTPVerificationForm component
const OTPVerificationForm = () => {
  // Initialize state variables using the useState hook
  const [otp, setOtp] = useState('');
  const [subscriptionRequired, setSubscriptionReq] = useState(false); 

  // Function to handle OTP verification
  const handleVerifyOTP = async () => {
    // API endpoint for OTP verification
    const apiUrl = 'http://localhost:3000/api/otpVerifys';

    // Retrieve reference number, phone number, and username from localStorage
    const referenceNumber = localStorage.getItem("referenceNumber");
    const phonenumber = localStorage.getItem("phoneNumber");
    const username = localStorage.getItem("username");

    // Payload to send for OTP verification
    const payload = {
      password: '0f9210995fcf47b0e466b0f594f236c2',
      referenceNo: referenceNumber,
      otp: otp,
    };

    // Send POST request to verify OTP
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from OTP verification
        if (data.statusCode === "S1000") {
          // Set subscription requirement to true if OTP is correct
          setSubscriptionReq(true);
          alert('OTP is correct. Verification successful!');
        } else {
          // Display alert if OTP is incorrect
          alert('Incorrect OTP. Please try again.');
        }
      })
      .catch(error => {
        // Handle errors during OTP verification
        console.error('Error:', error);
        alert('An error occurred while verifying OTP. Please try again.');
      });
  };

  // Effect hook to handle subscription if required
  useEffect(() => {
    // Check if subscription is required
    if (subscriptionRequired) {
      const fetchData = async () => {
        try {
          // Make an asynchronous call to subscribe the user
          const response = await fetch('http://localhost:3000/api/userSubscriptions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "subscriberId": "tel:abcdefghijklmnopqrstuvwxyz", // Placeholder for subscriberId
              "action": "0", // Placeholder for action
              password: "password", // Placeholder for password
            }),
          });
          // Parse response data
          const jsonData = await response.json();
          console.log(jsonData); // Log the response data
        } catch (error) {
          // Handle errors during subscription
          console.error('Error fetching data:', error);
        }
      };
      // Call fetchData function
      fetchData();
    }
  }, [subscriptionRequired]); // Run effect when subscriptionRequired state changes

  // Render the OTP verification form component
  return (
    <div className='otpContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form className='otpForm'>
        {/* Input field for OTP */}
        <label htmlFor="otp" className='textOTP'>Enter the OTP number that will be sent to your phone via SMS.</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        {/* Button to verify OTP */}
        <button type="button" onClick={handleVerifyOTP} className='otpButton'>
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
