import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About/About';
import SignUp from './layouts/user/SignUp';

function App() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

    // console.log('tu khoa tim kiem: ', tuKhoaTimKiem);

    return (
        <BrowserRouter>
            <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
            <Routes>
                <Route path="/" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                <Route path="/:maTheLoai" element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                <Route path="/about" element={<About />} />
                <Route path="/dangKy" element={<SignUp />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
