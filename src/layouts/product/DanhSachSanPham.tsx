import React, { useEffect, useState } from 'react';
import SachModel from '../../models/SachModel';
import SachProps from './components/SachProps';
import { layToanBoSach, timKiemSach } from '../../api/SachAPI';
import PhanTrang from '../utils/PhanTrang';

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai: number;
}

function DanhSachSanPham({ tuKhoaTimKiem, maTheLoai }: DanhSachSanPhamProps) {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    useEffect(() => {
        if (tuKhoaTimKiem === '' && maTheLoai === 0) {
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
        } else
            timKiemSach(tuKhoaTimKiem, maTheLoai)
                .then((kq) => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                })
                .catch((error) => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                });
    }, [trangHienTai, tuKhoaTimKiem, maTheLoai]);

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

    if (danhSachQuyenSach.length === 0) {
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    <h1>không có sách khớp với từ khóa tìm kiếm của bạn !!!</h1>
                </div>
            </div>
        );
    }

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
}

export default DanhSachSanPham;
