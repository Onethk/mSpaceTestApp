// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import './loginStyles.css';
// import { NextResponse } from 'next/server';


// export const LoginForm = () => {
//     const [phoneNum, setPhoneNum] = useState('');
//     const [password, setPassword] = useState('');
//     const [phoneNumberError, setPhoneNumberError] = useState('');

//     const router = useRouter();
    

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         // Update the corresponding state based on the input field name
//         if (name === 'phoneNumber') {
//             setPhoneNum(value);
//         }
//         if (name === 'password') {
//             setPassword(value);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Check for duplication
//         try {
//             const response = await fetch(`${process.env.baseUrl2}/api/verifyLogin`,{
//                     method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                 "phoneNumber": phoneNum,
//                 "password": password

                
//                 }),
//             }).then(res => {
//                 if(res.status === 200){
//                     router.ry(res.url)
//                 }
//                 console.log(res)
//             })
//             console.log("check1");

            
//             // const data = await response.json();
//             // console.log(data);
//             // if (data.exists) {
//             //     console.log("check1");
//             //     // return NextResponse.redirect('/new-page');
//             //     setPhoneNumberError('Phone number already exists');
//             //     // router.push('/SuccessPage');

//             // } else {
//             // }
//         } catch (error) {
//             console.error('Error checking phone number duplication:', error);
//         }
//     };

//     return (
//         <div className="formContainerTop">
//             <div className='formContainer'>
//                 <form onSubmit={handleSubmit}>
//                     <h1 className='formh1'>Stay Informed, Stay Ahead!🌐📱</h1>
//                     <p className='formP'>All your tech news under one roof !</p>
//                     <br />
//                     {/* Input field for phone number */}
//                     <label>
//                         Mobile Number:
//                         <input
//                             type="tel"
//                             name="phoneNumber"
//                             pattern="947[01]\d{7}"
//                             placeholder="9471xxxxxxx or 9470xxxxxxx"
//                             onChange={handleInputChange}
//                             value={phoneNum}
//                             required // Add required attribute to enforce input
//                         />
//                         {phoneNumberError && <span className="error">{phoneNumberError}</span>}
//                     </label>
//                     <br /><br />
//                     <label>
//                         Password:
//                         <input
//                             type="password"
//                             name="password"
//                             onChange={handleInputChange}
//                             value={password}
//                         />
//                     </label>
//                     <br />
                     
//                     <button type="submit" className='subscribeButton' onClick={handleSubmit}>Login</button>
//                     <br />
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;





"use client";
import React, { useState } from 'react';
import './loginStyles.css';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { generateHash } from '../LoginForm/hashing'; // Import the hashing function
import { useSelector, useDispatch } from 'react-redux';


export const LoginForm = () => {

    // State variables for phone number, password, and error message
    // const [phoneNum, setPhoneNum] = useState('');
    // const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const phonenumber = useSelector((state) => state.phoneNum);
    const password = useSelector((state) => state.password);
    const referencenumber = useSelector((state) => state.referenceNum);
    const [errorMessage, setErrorMessage] = useState('');

    // useRouter hook for navigation
    const router = useRouter();

    // Hashing the phone number
    const hashedPhoneNumber = generateHash(phonenumber);

    // Function to handle input changes
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
 
    //     // Updating local storage and state based on input name
    //     if (name === 'phoneNumber') {
    //         localStorage.setItem("phoneNumber",value);
    //         setPhoneNum(value);
    //     }
    //     if (name === 'password') {
    //         localStorage.setItem("password",value);
    //         setPassword(value);
    //     }

    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Dispatch actions to update phoneNum and password
        if (name === 'phoneNumber') {
            dispatch({ type: 'UPDATE_PHONE_NUM', payload: value });
        } else if (name === 'password') {
            dispatch({ type: 'UPDATE_PASSWORD', payload: value });
        }else if (name === 'referenceNumber') {
            dispatch({ type: 'UPDATE_REFERENCE_NUM', payload: value });
        }    
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const referenceNumber = localStorage.getItem("referenceNumber");

    //     try {
    //         const response = await fetch(`${process.env.baseUrl2}/api/verifyLogin`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json', 
    //             },
    //             body: JSON.stringify({
    //                 "phoneNumber": phoneNum,
    //                 "password": password
    //             }),
    //         });
    //         console.log("verifyLogin", response);
    //         console.log(localStorage.getItem("phoneNumber"));
    //         console.log("hashhh",hashedPhoneNumber);

    //         const response1 = await fetch(`${process.env.baseUrl1}/subscription/getStatus`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 "applicationId": "APP_999999",
    //                 password: "95904999aa8edb0c038b3295fdd271de",
    //                 subscriberId: `tel:${hashedPhoneNumber}`
    //             }),
    //         });
    //         const data1 = await response1.json();
    //         console.log("getstatus", data1);
    //         console.log("bye",data1.subscriptionStatus);
    //         localStorage.setItem("userStatus",{phoneNumber: phoneNum,status: data1.subscriptionStatus});
    //         // if(localStorage.getItem("useStatus"))
    //         // localStorage.setItem("status", data1.subscriptionStatus);

    //         if (response.redirected) {

    //             router.push(response.url);
    //         } else {
    //             const data = await response.json();
    //             setErrorMessage(data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error checking login:', error);
    //         setErrorMessage('Internal Server Error');
    //     }
    // };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        // const referenceNumber = localStorage.getItem("referenceNumber");
    
        try {
            const response = await fetch(`${process.env.baseUrl2}/api/verifyLogin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "phoneNumber": phonenumber,
                    "password": password
                }),
            });
            console.log("verifyLogin", response);
            // console.log(localStorage.getItem("phoneNumber"));
            console.log("hashhh", hashedPhoneNumber);
    
            const response1 = await fetch(`${process.env.baseUrl1}/subscription/getStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "applicationId": "APP_999999",
                    password: "95904999aa8edb0c038b3295fdd271de",
                    subscriberId: `tel:${hashedPhoneNumber}`
                }),
            });
            const data1 = await response1.json();
            console.log("getstatus", data1);
            // localStorage.setItem("userStatus", { phoneNumber: phoneNum, status: data1.subscriptionStatus });
            
            // Check if subscription status is "REGISTERED"
            if (data1.subscriptionStatus === "REGISTERED") {
                if (response.redirected) {
                    router.push(response.url);
                } else {
                    const data = await response.json();
                    setErrorMessage(data.message);
                }
            } else {
                // Display an error message or handle the condition where status is not "REGISTERED"
                setErrorMessage("Subscription not registered. Please register to proceed.");
                // setErrorMessage("User at ",data1.subscriptionStatus,"stage. User is not registered");

            }
        } catch (error) {
            console.error('Error checking login:', error);
            setErrorMessage('Internal Server Error');
        }
    };
    
    return (
        <div className="formContainerTop">
            <div className='formContainer'>
                <form onSubmit={handleSubmit}>
                    <h1 className='formh1'>Stay Informed, Stay Ahead!🌐📱</h1>
                    <p className='formP'>All your tech news under one roof!</p>
                    <br />
                    <label>
                        Mobile Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            pattern="947[01]\d{7}"
                            placeholder="9471xxxxxxx or 9470xxxxxxx"
                            onChange={handleInputChange}
                            value={phonenumber}
                            required
                        />
                    </label>
                    <br /><br />
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            value={password}
                            required
                        />
                    </label>
                    <br />
                    {errorMessage && <span className="error">{errorMessage}</span>}
                    <br></br>
                    <button type="submit" className='subscribeButton'>Login</button>
                    <br />
                </form>
            </div>
        </div>
    );
};

export default LoginForm;