import { useState } from 'react';

function SignUp() {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauLapLai, setMatKhauLapLai] = useState('');
    const [email, setEmail] = useState('');
    const [hoDem, setHoDem] = useState('');
    const [ten, setTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');

    //các biến báo lỗi
    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorHoDem, setErrorHoDem] = useState('');
    const [errorTen, setErrorTen] = useState('');
    const [errorSoDienThoai, setErrorSoDienThoai] = useState('');
    const [errorGioiTinh, setErrorGioiTinh] = useState('');
    const [thongBao, setThongBao] = useState('');

    //XỬ LÝ SỰ KIỆN SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');

        const isTenDangNhapValid = !(await kiemTraTenDangNhapDaTonTai(tenDangNhap));
        const isEmailValid = !(await kiemTraEmailDaTonTai(email));
        const isMatKhauValid = !kiemTraMatKhau(matKhau);
        const isMatKhauLapLaiValid = !kiemTraMatKhauLapLai(matKhauLapLai);

        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {
            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        gioiTinh: gioiTinh.charAt(0), // Lấy ký tự đầu tiên của chuỗi
                    }),
                });

                if (response.ok) {
                    setThongBao('Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!');
                } else {
                    console.log(response.json());
                    setThongBao('Đã xảy ra lỗi trong quá trình đăng ký tài khoản.');
                }
            } catch (error) {
                setThongBao('Đã xảy ra lỗi trong quá trình đăng ký tài khoản.');
            }
        }
    };

    // kiểm tra tên đăng nhập
    // http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
        //end-poit
        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;
        console.log(url);

        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === 'true') {
                setErrorTenDangNhap('Tên đăng nhập đã tồn tại!!!');
                return true;
            }
            return false;
        } catch (error) {
            console.error('lỗi khi kiểm tra tên đăng nhập!!!');
            return true;
        }
    };

    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(e.target.value);
        setErrorTenDangNhap('');

        return kiemTraTenDangNhapDaTonTai(e.target.value);
    };

    //-----------------KIỂM TRA EMAIL-------------------------
    // http://localhost:8080/nguoi-dung/search/existsByEmail?email=nguoidung1@email.com
    const kiemTraEmailDaTonTai = async (email: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;

        try {
            const response = await fetch(url);
            const data = await response.text();

            if (data === 'true') {
                setErrorEmail('Email đã tồn tại...');
                return true;
            }
            return false;
        } catch (error) {
            console.error('lỗi khi kiểm tra email!!!');
            return true;
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail('');

        return kiemTraEmailDaTonTai(e.target.value);
    };

    //-------------kiểm tra passworđ-------------
    const kiemTraMatKhau = (matKhau: string) => {
        //Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau('Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)');
            return true;
        } else {
            setErrorMatKhau('');
            return false;
        }
    };

    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhau(e.target.value);

        setErrorMatKhau(e.target.value);
        kiemTraMatKhau(e.target.value);
    };

    //-----------KIỂM TRA MẬT KHẨU LẶP LẠI

    const kiemTraMatKhauLapLai = (matKhauLapLai: string) => {
        if (matKhauLapLai !== matKhau) {
            setErrorMatKhauLapLai('mật khẩu lặp lại không khớp ');
            return true;
        } else {
            setErrorMatKhauLapLai('');
            return false;
        }
    };

    const handleMatKhauLapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhauLapLai(e.target.value);

        setErrorMatKhauLapLai('');

        kiemTraMatKhauLapLai(e.target.value);
    };

    return (
        <div className="container">
            <h1 className="">ĐĂNG KÝ</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            id="tenDangNhap"
                            placeholder="Nhập tên đăng nhập ..."
                            className="form-control"
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange}
                        />
                        <div style={{ color: 'red' }}>{errorTenDangNhap}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            email
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Nhập email của bạn ..."
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div style={{ color: 'red' }}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhau" className="form-label">
                            mật khẩu
                        </label>
                        <input
                            type="password"
                            id="matKhau"
                            placeholder="Nhập mật khẩu của bạn ..."
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange}
                        />
                        <div style={{ color: 'red' }}>{errorMatKhau}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhauLapLai" className="form-label">
                            Mật khẩu lặp lại
                        </label>
                        <input
                            type="password"
                            id="matKhauLapLai"
                            placeholder="Nhập mật khẩu lặp lại của bạn ..."
                            className="form-control"
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLaiChange}
                        />
                        <div style={{ color: 'red' }}>{errorMatKhauLapLai}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hoDem" className="form-label">
                            Họ đệm
                        </label>
                        <input
                            type="text"
                            id="hoDem"
                            placeholder="Nhập họ đệm của bạn ..."
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDem(e.target.value)}
                        />
                        <div style={{ color: 'red' }}>{errorHoDem}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ten" className="form-label">
                            Tên
                        </label>
                        <input
                            type="text"
                            id="ten"
                            placeholder="Nhập tên của bạn ..."
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                        <div style={{ color: 'red' }}>{errorTen}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="soDienThoai" className="form-label">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="soDienThoai"
                            placeholder="Nhập số điện thoại của bạn ..."
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                        />
                        <div style={{ color: 'red' }}>{errorSoDienThoai}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">
                            Giới tính
                        </label>
                        <select
                            id="gioiTinh"
                            className="form-select"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                        <div style={{ color: 'red' }}>{errorGioiTinh}</div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Đăng ký
                        </button>
                    </div>
                    <div style={{ color: 'green' }}>{thongBao}</div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
