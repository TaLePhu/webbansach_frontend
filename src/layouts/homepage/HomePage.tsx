import React from 'react';
import Banner from './components/Banner';
import Carousel from './components/Carousel';
import DanhSachSanPham from '../product/DanhSachSanPham';

interface HomePageProp {
    tuKhoaTimKiem: string;
}

function HomePage({ tuKhoaTimKiem }: HomePageProp) {
    return (
        <div>
            <Banner />
            <Carousel />
            <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} />
        </div>
    );
}

export default HomePage;
