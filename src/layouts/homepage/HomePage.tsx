import React from 'react';
import Banner from './components/Banner';
import Carousel from './components/Carousel';
import DanhSachSanPham from '../product/DanhSachSanPham';
import { useParams } from 'react-router-dom';

interface HomePageProp {
    tuKhoaTimKiem: string;
}

function HomePage({ tuKhoaTimKiem }: HomePageProp) {
    const { maTheLoai } = useParams(); // lây maTheLoai từ url gán vào maTheLoai

    let maTheLoaiNumber = 0;

    try {
        maTheLoaiNumber = parseInt(maTheLoai + ''); // NaN
    } catch (error) {
        maTheLoaiNumber = 0;
        console.log('eror maTheLoai: ', error);
    }

    if (Number.isNaN(maTheLoaiNumber)) {
        maTheLoaiNumber = 0;
    }

    return (
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumber} />
        </div>
    );
}

export default HomePage;
