import React, { useRef, useState } from 'react';



export default function Order() {

    const div__detai = useRef(0);
    const btn__detail = useRef(0);

    const div__infouser = useRef(0);
    const btn__infouser = useRef(0);

    const [isActive, setActive] = useState("false");

    const showDetailOrder = () => {

        setActive(!isActive);
        if (btn__detail.current.value == 1) {
            div__detai.current.style.display = "block";
            btn__detail.current.value = 2;
        }
        else if (btn__detail.current.value == 2) {
            div__detai.current.style.display = "none";
            btn__detail.current.value = 1;
        }

    }

    const showDetailUser = () => {
        if (btn__infouser.current.value == 1) {
            div__infouser.current.style.display = "flex";
            btn__infouser.current.value = 2;
        }
        else if (btn__infouser.current.value == 2) {
            div__infouser.current.style.display = "none";
            btn__infouser.current.value = 1;
        }

    }

    return (
        <div className="order">
            <div className="order__top">
                <div className="order__content__">1001</div>
                <div className="order__content__">15/12/2020</div>
                <div className="order__content__">1</div>
                <div className="order__content__">115.000.000 đ</div>
                <div className="order__content__btn__accept">
                    <div class="btn__accept">
                        Xác nhận
                    </div>
                </div>
                <div className="order__content__">
                    <button className="btn__user" ref={btn__infouser} value="1" onClick={showDetailUser}>
                        <i className="fas fa-user"></i>
                    </button>
                </div>
                <div className="order__content__ order__detail__">
                    <button className='btn__' value='1' ref={btn__detail}
                        onClick={showDetailOrder}>
                        <i className={isActive ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
                    </button>
                </div>
            </div>

            {/* Thông tin khách hàng */}
            <div className="order__bot__user" ref={div__infouser}>
                <div className="order__bot__user__left">
                    <h3>Nguyễn Phạm Minh Nhật</h3>
                    <h4>SĐT: 123456789</h4>
                </div>
                <div className="order__bot__user__right">
                    <h3>Địa chỉ:</h3>
                    <p>Trường đại học công nghệ thông tin Trường đại học công nghệ thông tin Trường đại học công nghệ thông tin Trường đại học công nghệ thông tin</p>
                </div>
            </div>

            {/* Thông tin các sp trong đơn hàng */}
            <div id="Order__bot__detail" className="order__bot__detail" ref={div__detai}>
                <div className='item'>
                    <div className='item__avatar'>
                        <img className='avatar' src="https://cdn.tgdd.vn/Products/Images/44/213569/dell-inspiron-5593-i5-1035g1-4gb-1tb-128gb-2gb-mx2-1-600x600.jpg" alt='hinh laptop' />
                    </div>
                    <div className='item__content'>
                        <h3 className='content'>Dell Vostro 14 5402 (Chính hãng)</h3>
                        <p>SKU: Vostro540202CF</p>
                    </div>
                    <div className='item__price'>
                        <div className='price'>
                            <strong>17.990.000 ₫</strong>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <div className='item__avatar'>
                        <img className='avatar' src="https://cdn.tgdd.vn/Products/Images/44/213569/dell-inspiron-5593-i5-1035g1-4gb-1tb-128gb-2gb-mx2-1-600x600.jpg" alt='hinh laptop' />
                    </div>
                    <div className='item__content'>
                        <h3 className='content'>Dell Vostro 14 5402 (Chính hãng)</h3>
                        <p>SKU: Vostro540202CF</p>
                    </div>
                    <div className='item__price'>
                        <div className='price'>
                            <strong>17.990.000 ₫</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

