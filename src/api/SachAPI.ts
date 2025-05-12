import SachModel from '../models/SachModel';
import { my_request } from './Request';

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
    console.log('data: ', responseData);

    const tongSoSach: number = response.page.totalElements;

    const tongSoTrang: number = response.page.totalPages;

    for (const key in responseData) {
        // ketQua[maSach: maSach, tenSach: tenSach]
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

//http://localhost:8080/sach/search/findByTenSachContaining?tenSach=tieu%20thuy

export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {
    let duongDan = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

    if (tuKhoaTimKiem !== '') {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}`;
    }

    if (tuKhoaTimKiem === '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&maTheLoai=${maTheLoai}`;
    }

    if (tuKhoaTimKiem !== '' && maTheLoai > 0) {
        duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}`;
    }

    return laySach(duongDan);
}

export async function laySachTheoMa(maSach: number): Promise<SachModel | null> {
    const duongDan: string = `http://localhost:8080/sach/${maSach}`;

    try {
        const response = await fetch(duongDan);

        if (!response.ok) {
            throw new Error('không thể truy cập ' + duongDan);
        }
        const data = await response.json();

        if (data) {
            return {
                maSach: data.maSach,
                tenSach: data.tenSach,
                giaBan: data.giaBan,
                giaNiemYet: data.giaNiemYet,
                moTa: data.moTa,
                soLuong: data.soLuong,
                tenTacGia: data.tenTacGia,
                trungBinhXepHang: data.trungBinhXepHang,
            };
        } else {
            throw new Error('không có sách nào');
        }
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}
