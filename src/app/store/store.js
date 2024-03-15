// store.js
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);


// // const store = configureStore({
// //     reducer: counterSlice.reducer
// //   });
  
//   // Save state to local storage whenever it changes
//   store.subscribe(() => {
//     localStorage.setItem('phoneNum', JSON.stringify(store.getState().phoneNum));
//     localStorage.setItem('password', JSON.stringify(store.getState().password));
//     localStorage.setItem('referenceNum', JSON.stringify(store.getState().referenceNum));
//   });

export default store;




