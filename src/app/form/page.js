"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './formstyles.css';

// Define a functional component named Form
const Form = () => {
    // Initialize the useRouter hook from Next.js
    const router = useRouter();

    // Initialize state variables using the useState hook
    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');

    // Initialize formData state to hold form data
    const [formData, setFormData] = useState({
        password: '0f9210995fcf47b0e466b0f594f236c2',
        subscriberId: 'tel:{phoneNum}', // Template string to be replaced
        applicationHash: 'abcdefgh',
        applicationMetaData: {
            client: 'MOBILEAPP',
            device: 'Samsung S10',
            os: 'android 8',
            appCode: 'https://play.google.com/store/apps/details?id=lk',
        },
    });

    // Function to handle input changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the corresponding state based on the input field name
        if (name === 'phoneNumber') {
            setPhoneNum(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    // Function to handle form submission
    const handleClick = async (e) => {
        console.log(process.env.baseUrl1);
        e.preventDefault();

        // Extract phone number from formData and remove 'tel:' prefix
        const phoneNumber = formData.subscriberId.replace('tel:', '');

        // Update formData with the new phone number
        setFormData({
            ...formData,
            subscriberId: `tel:${phoneNumber}`,
        });

        try {
            // Make an API call to submit form data
            const response = await fetch(`${process.env.baseUrl1}/otp/request`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "applicationId": "APP_000375",
                    "password": "a07118cda5215fc6d01db5b2ab848edd", // Placeholder for actual password logic
                    subscriberId: 'tel:abcdefghijklmnopqrstuvwxyz', // Placeholder for actual subscriberId
                    applicationHash: 'abcdefgh',
                    client: 'MOBILEAPP',
                    device: 'Samsung S10',
                    os: 'android 8',
                    appCode: 'https://play.google.com/store/apps/details?id=lk',
                }),
            });

            // Parse the response JSON
            const data = await response.json();

            // If API call is successful, proceed to OTP verification page
            if (data.statusCode === "S1000") {
                // Store form data in localStorage for future use
                localStorage.setItem("phoneNumber", phoneNum);
                // localStorage.setItem("username", userName);
                localStorage.setItem("password", password);
                localStorage.setItem("referenceNumber", data.referenceNo)
                // Navigate to OTP verification page
                router.push('/OtpVerification');
            } else {
                // Display an alert if something went wrong with the API call
                alert("Something went wrong")
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    // Render the form component
    return (
        <div className="formContainerTop">
            <div className='formContainer'>
                <form>
                    <h1 className='formh1'>Stay Informed, Stay Ahead!🌐📱</h1>
                    <p className='formP'>All your tech news under one roof !</p>
                    <br></br>
                    {/* Input field for phone number */}
                    <label>
                        Mobile Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            pattern="947[01]\d{7}"
                            placeholder="9471xxxxxxx or 9470xxxxxxx"
                            onChange={handleInputChange}
                            required // Add required attribute to enforce input
                        />
                    </label>
                    <br /><br />
                    {/* Input field for password */}
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                        />
                    </label>
                    <br></br>
                    {/* Button to submit the form */}
                    <button onClick={handleClick} className='subscribeButton'>Request OTP</button>
                    <br></br>
                </form>
            </div>
        </div>
    );
};

export default Form;
















