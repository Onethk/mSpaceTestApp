"use client"
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const App = ({ children }) => {
  return (<Provider store={store}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>)
};

export default App;


