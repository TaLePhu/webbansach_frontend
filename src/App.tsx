import React from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import { layToanBoAnhCuaMotSach } from './api/HinhAnhAPI';

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
