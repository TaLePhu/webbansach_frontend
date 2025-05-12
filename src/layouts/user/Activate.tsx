import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Activate() {
    const { email } = useParams();
    const { maKichHoat } = useParams();
    const [daKichHoat, setDaKichHoat] = useState(false);
    const [thongBao, setThongBao] = useState('');

    useEffect(() => {
        console.log('email: ', email);
        console.log('ma kich hoat: ', maKichHoat);
        if (email && maKichHoat) {
            thucHienKichHoat();
        }
    }, []);

    // `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`
    const thucHienKichHoat = async () => {
        try {
            const url: string = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`;
            const response = await fetch(url, { method: 'GET' });

            if (response.ok) {
                setDaKichHoat(true);
            } else {
                setThongBao(response.text + '');
            }
        } catch (error) {
            console.log('Lỗi khi kích hoạt:', error);
        }
    };

    return (
        <div>
            <h1>Kích hoạt tài khoản:</h1>
            {daKichHoat ? (
                <p style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>
                    {' '}
                    Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!
                </p>
            ) : (
                <p>{thongBao}</p>
            )}
        </div>
    );
}

export default Activate;
