import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';

function App() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

    // console.log('tu khoa tim kiem: ', tuKhoaTimKiem);

    return (
        <div>
            <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
            <HomePage tuKhoaTimKiem={tuKhoaTimKiem} />
            <Footer />
        </div>
    );
}

export default App;
