import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './layouts/homepage/HomePage';

function App() {
  return (
    <div>
      <Navbar/>
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
