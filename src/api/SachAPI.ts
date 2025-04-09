import React from 'react';
import SachModel from '../models/SachModel';
import { my_request } from './Request';
import { log } from 'console';

interface KetQuaInterface {
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];

    const response = await my_request(duongDan);

    // console.log('response', response); //return Obj => đi vào _embedded lấy ra saches[]

    // lay ra json sach
    const responseData = response._embedded.saches;

    const tongSoSach: number = response.page.totalElements;

    const tongSoTrang: number = response.page.totalPages;

    for (const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang,
        });
    }

    return { ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang };
}

export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
    //xac dinh endpoint
    const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;

    return laySach(duongDan);
}

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
    //xac dinh endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';

    return laySach(duongDan);
}
