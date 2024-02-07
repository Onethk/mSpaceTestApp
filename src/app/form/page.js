"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';



const Form = () => {
    const router = useRouter()
  const [phoneNum, setPhoneNum] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '0f9210995fcf47b0e466b0f594f236c2',
    subscriberId: 'tel:{phoneNum}',
    applicationHash: 'abcdefgh',
    applicationMetaData: {
      client: 'MOBILEAPP',
      device: 'Samsung S10',
      os: 'android 8',
      appCode: 'https://play.google.com/store/apps/details?id=lk',
    },
  });

  // console.log('hello1')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("name", name );
    // console.log("value", value);

    if (name === 'phoneNumber') {
      setPhoneNum(value);
    }
    if (name === 'username') {
      setUserName(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const phoneNumber = formData.subscriberId.replace('tel:', '');

    setFormData({
      ...formData,
      subscriberId: `tel:${phoneNumber}`,
    });

    try {
      console.log(phoneNum);
      console.log(userName);
      console.log(password);
      console.log('api call');

      const response = await fetch('http://localhost:3000/api/otpRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: 'password', // Update with your password logic
          subscriberId: `tel:${phoneNum}`,
          applicationHash: 'abcdefgh',
          client: 'MOBILEAPP',
          device: 'Samsung S10',
          os: 'android 8',
          appCode: 'https://play.google.com/store/apps/details?id=lk',
        }),
        
      });

      const data = await response.json();
      console.log(data);
       
       if (response.ok) {
        const saveResponse = fetch('/api/subscribe', {
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
        
        
        // const saveData = await saveResponse.json();
        // console.log(saveData);

      }
      
      router.push('/OtpVerification');

      // navigate('/otp');

    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

      
  return (
    <div className="App">
      <h1>Knowledge Sharing</h1>
      <form>
        <label>
            Phone Number:
            <input
            type="tel"
            name="phoneNumber"
            pattern="[0-9]{10}"
            placeholder="Format: 1234567890"      
            // value={phoneNumber}

            // value={formData.subscriberId.replace('tel:', '')} // Extract the number without 'tel:'
            onChange={handleInputChange}
            // required
            />
        </label>

        <br /><br />
        <label>
            Username:
            <input
            type="text"
            name="username"
            // value={username}
            // value={formData.applicationMetaData.client}
            onChange={handleInputChange}
            // required
            />
        </label>

        <br /><br />
        <label>
            Password:
            <input
            type="password"
            name="password"
            // value={password}
            // value={formData.password}
            onChange={handleInputChange}
            // required
            />
        </label>
        <br></br>
        
        {/* <subscribeComponent/> */}
        {/* <button onClick={handleClick} type="submit" href="otp">Subscribe</button> */}
        <button onClick={handleClick}>Click me</button>

        {/* <Link to="/otp">
            <button onSubmit={handleClick}>Subscribe</button>
        </Link> */}

        <br></br>
        </form>
    </div>
  );
};

export default Form;

