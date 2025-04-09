import React, { use, useEffect, useState } from 'react';
import SachModel from '../../models/SachModel';
import SachProps from './components/SachProps';
import { layToanBoSach } from '../../api/SachAPI';
import PhanTrang from '../utils/PhanTrang';
import { log } from 'console';

const DanhSachSanPham: React.FC = () => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoSach, setTongSoSach] = useState(0);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    console.log(trangHienTai);
    console.log('tong so trang:', tongSoTrang);

    useEffect(() => {
        layToanBoSach(trangHienTai - 1)
            .then((kq) => {
                setDanhSachQuyenSach(kq.ketQua);
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);
            })
            .catch((error) => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            });
    }, [trangHienTai]);

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    //phanTrang
    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {danhSachQuyenSach.map((sach) => (
                    <SachProps key={sach.maSach} sach={sach} />
                ))}
            </div>

            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    );
};

export default DanhSachSanPham;
