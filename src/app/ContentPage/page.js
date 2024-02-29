"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './ContentStyles.css';
import { generateHash } from '../LoginForm/hashing'; // Import the hashing function


export const ContentPage = () => {

  // e.preventDefault();

  const router = useRouter(); 
  const [phoneNum, setPhoneNum] = useState('');

  const hashedPhoneNumber = generateHash(phoneNum);


  
  const [phoneNumber, setPhoneNumber] = useState(""); // State to store phone number

  useEffect(() => {
    // Retrieve phone number from localStorage
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    setPhoneNumber(storedPhoneNumber);
  }, []);



  const handleClick = async(e) => {
    e.preventDefault();
    console.log("asdfasfasfa sd fasd fasdfasdfasdf ",localStorage.getItem("phoneNumber"))
    const payload = {
      "applicationId": "APP_999999",
      password: "95904999aa8edb0c038b3295fdd271de",
      subscriberId: `tel:${hashedPhoneNumber}`,
      action: "0"
    };
    console.log(hashedPhoneNumber);
    console.log("Payload",payload)
    const response =await fetch(`${process.env.baseUrl1}/subscription/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    const jsonData = await response.json();
    
    console.log("Unsubscription",jsonData);

    const responseUnSub =await fetch(`http://localhost:3003/api/Unsubsription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"phoneNumber":localStorage.getItem("phoneNumber"), "password":localStorage.getItem("password")}),
    })



    // await fetch(`${process.env.baseUrl1}/subscription/send`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(payload)
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   // Handle success response here
    //   console.log(response);
    //   console.log('Data successfully sent');
    // })
    // .catch(error => {
    //   // Handle error here
    //   console.error('There was a problem with your fetch operation:', error);
    // });
    
    router.push('/UnsubscriptionPage');

  };

  return (
    <section className="contentContainer">
      <article>
        <h2>Tech News Article</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in justo nec risus faucibus faucibus.</p>
        <a href="#" className="read-more">Read more</a>
        <br/><br/>
        <button type="button" onClick={handleClick} className='otpButton'>Unsubscribe</button>
      </article>
    </section>
  );
};

export default ContentPage;











