import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './layouts/homepage/HomePage';
import List from './layouts/product/List';

function App() {
  return (
    <div>
      <Navbar/>
      <HomePage/>
      <List/>
      <Footer/>
    </div>
  );
}

export default App;
