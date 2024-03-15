"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './otpStyles.css';
import { json } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Define the OTPVerificationForm component
const OTPVerificationForm = () => {
  // Initialize state variables using the useState hook
  const [otp, setOtp] = useState('');
  const [subscriptionRequired, setSubscriptionReq] = useState(false); 
  const router = useRouter(); 

  
  // Retrieve phone number and password from localStorage
 
  const phonenumber = useSelector((state) => state.phoneNum);
  const password = useSelector((state) => state.password);
  const dispatch = useDispatch();


  const referencenumber = useSelector((state) => state.referenceNum);
  console.log(phonenumber, password, referencenumber);

  useEffect(() => {
    if (!referencenumber || referencenumber === 0) {
      router.push('/form'); // Redirect to the form page
    }
  }, [referencenumber, router]);


  // Function to handle OTP verification
  // const handleVerifyOTP = async () => {
  //   // API endpoint for OTP verification
  //   const apiUrl = `${process.env.baseUrl1}/otp/verify`;

  //   // Retrieve reference number, phone number, and username from localStorage
  //   const referenceNumber = localStorage.getItem("referenceNumber");

  //   // Payload to send for OTP verification
  //   const payload = {
  //     "applicationId": "APP_000375",
  //     "password": "a07118cda5215fc6d01db5b2ab848edd",
  //     referenceNo: referenceNumber,
  //     otp: otp,
  //   };

  //   // Send POST request to verify OTP
  //   fetch(apiUrl, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // Handle response from OTP verification
  //       console.log(data);
  //       if (data.statusCode === "S1000") {
  //         // Set subscription requirement to true if OTP is correct
  //         setSubscriptionReq(true);
  //         console.log(subscriptionRequired);
  //       } else {
  //         // Display alert if OTP is incorrect
  //         alert('Incorrect OTP. Please try again.');
  //       }
  //     })
  //     .catch(error => {
  //       // Handle errors during OTP verification
  //       console.error('Error:', error);
  //       alert('An error occurred while verifying OTP. Please try again.');
  //     });
  // };

  // Function to handle OTP verification
const handleVerifyOTP = async () => {
  // Validate OTP length
  if (otp.length !== 6) {
    alert('Please enter a 6-digit OTP.');
    return;
  }

  // API endpoint for OTP verification
  const apiUrl = `${process.env.baseUrl1}/otp/verify`;

  // Retrieve reference number, phone number, and username from localStorage
  // Payload to send for OTP verification
  const payload = {
    "applicationId": "APP_000375",
    "password": "a07118cda5215fc6d01db5b2ab848edd",
    referenceNo: referencenumber,
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
      console.log(data);
      if (data.statusCode === "S1000") {
        // Set subscription requirement to true if OTP is correct
        setSubscriptionReq(true);
        console.log(subscriptionRequired);
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
          const response = await fetch(`${process.env.baseUrl1}/subscription/send`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "applicationId": "APP_999999",
              "password": "95904999aa8edb0c038b3295fdd271de",
              "subscriberId": "tel:abcdefghijklmnopqrstuvwxyz", // Placeholder for subscriberId
              "action": "1", // Placeholder for action
            }),
          });

          // Parse response data
          const jsonData = await response.json();
          console.log("Subscription",jsonData); // Log the response data
          console.log(jsonData.statusCode);
          dispatch(updateStatusCode(jsonData.successStatus));
          if(jsonData.statusCode === "S1000"){
            const response = await fetch(`http://localhost:3003/api/saveSignUpData`, {
              method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              "phoneNumber": phonenumber, 
              password: password, 
            }),


            }).then(response => console.log(response))
            // saveSignUpData
            router.push('/SuccessPage');
          }else{
            alert("Subscription Failed");
          }
                    
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
