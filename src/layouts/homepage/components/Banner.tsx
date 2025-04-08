import React from "react";

const Banner = () => {
    return(
        <div>
            <div className="p-2 mb-2 bg-dark">
                <div className="container-fluid py-5 text-white d-flex 
                justify-content-center align-items-center" >
                    <div>
                        <h3 className="display-5 fw-bold">
                        Như thế nào là một thể xác không có tâm hồn?<br/> Đó là một căn phòng không có nổi một quyển sách.
                        </h3>
                        <p className="">Cicero</p>
                        <button className="btn btn-primary btn-lg text-white float-end">Khám phá sách tại my Bookstore</button>                        
                    </div>
                </div>
        </div>
        </div>
    )
}

export default Banner;