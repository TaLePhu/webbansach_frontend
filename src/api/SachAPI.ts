import { error, log } from "console";
import React from "react";
import SachModel from "../models/SachModel";

export async function my_request(duongDan: string) {
    //truy van endpoint
    const response = await fetch(duongDan);

    if(!response.ok) {
        throw new Error(`không thể truy cập ${duongDan}`);
    }

    return response.json();
}

export async function layToanBoSach(): Promise<SachModel[]> {
    const ketQua: SachModel[] = [];

    //xac dinh endpoint
    const duongDan: string = 'http://localhost:8080/sach';

    //goi phuong thuc request
    const response = await my_request(duongDan);

    // lay ra jjson sach
    const responseData = response._embedded.saches;
    console.log(responseData);

    for(const key in responseData) {
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang
        });
    }
    
    return ketQua;
}