"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router';


const OTPVerificationForm = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = () => {
    const apiUrl = 'http://localhost:3000/otp/verify';

    const payload = {
    //   applicationId: 'APP_008130',
      password: '0f9210995fcf47b0e466b0f594f236c2',
      referenceNo: '213561321321613',
      otp: otp,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Assuming the API response contains a success property
        if (data.success) {
          alert('OTP is correct. Verification successful!');
          // Redirect or perform additional actions after successful verification
        } else {
          alert('Incorrect OTP. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while verifying OTP. Please try again.');
      });

      if (response.ok) {
        const saveResponse = fetch('/api/verifydata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNum,
            username: userName,
            password: password
          }),
        });
      }    
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="button" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
