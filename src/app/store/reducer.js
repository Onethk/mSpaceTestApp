// import { UPDATE_PHONE_NUM, UPDATE_PASSWORD, UPDATE_REFERENCE_NUM } from './actions';

// const initialState = {
//   phoneNum: '',
//   password: '',
//   referenceNum: ''  
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_PHONE_NUM:
//         console.log("phone",action);
//         console.log("test phone ",action.payload);
//       return {
//         ...state,
//         phoneNum: action.payload,
//       };
//     case UPDATE_PASSWORD:
//         console.log("password",action);
//         console.log("test pass ",action.payload);
//       return {
//         ...state,
//         password: action.payload,
//       };
//     case UPDATE_REFERENCE_NUM:
//       console.log("refdsds",action.payload);
//     return {
//       ...state,
//       referenceNum: action.payload,
//     };
//     default:
//       return state;
//   }
// };


// export default reducer;


// reducer.js
// reducer.js

import { UPDATE_PHONE_NUM, UPDATE_PASSWORD, UPDATE_REFERENCE_NUM, UPDATE_SUCCESS_STATUS } from './actions';

// Load initial state from local storage if available (only in the browser environment)
const initialState = {
  phoneNum: typeof window !== 'undefined' ? localStorage.getItem('phoneNum') || '' : '',
  password: typeof window !== 'undefined' ? localStorage.getItem('password') || '' : '',
  referenceNum: typeof window !== 'undefined' ? localStorage.getItem('referenceNum') || '' : '',
  successStatus: typeof window !== 'undefined' ? (localStorage.getItem('successStatus') === 'S1001') : 'S1000',

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PHONE_NUM:
      // Update phoneNum in state and local storage (only in the browser environment)
      if (typeof window !== 'undefined') {
        localStorage.setItem('phoneNum', action.payload);
      }
      return {
        ...state,
        phoneNum: action.payload,
      };
    case UPDATE_PASSWORD:
      // Update password in state and local storage (only in the browser environment)
      if (typeof window !== 'undefined') {
        localStorage.setItem('password', action.payload);
      }
      return {
        ...state,
        password: action.payload,
      };
    case UPDATE_REFERENCE_NUM:
      if (typeof window !== 'undefined') {
        localStorage.setItem('referenceNum', action.payload);
      }
      return {
        ...state,
        referenceNum: action.payload,
      };
      case UPDATE_REFERENCE_NUM:
        if (typeof window !== 'undefined') {
          localStorage.setItem('referenceNum', action.payload);
        }
        return {
          ...state,
          referenceNum: action.payload,
        };  
      case UPDATE_SUCCESS_STATUS:
        if (typeof window !== 'undefined') {
          localStorage.setItem('successStatus', action.payload);
        }
        return {
          ...state,
          successStatus: action.payload,
        };  
    default:
      return state;
  }
};

export default reducer;
