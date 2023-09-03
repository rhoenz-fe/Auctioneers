import React from 'react';
import Header from './Header';
import AuctionList from './AuctionList';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <AuctionList />
      <ToastContainer />

    </div>
  );
}

export default App;
