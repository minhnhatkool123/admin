import React from 'react';
import Order from './Order';

import './Orders.css';
export default function Orders() {
    return (
        <main id='order__main'>
            <h1>Orders</h1>
            <div className='order__title'>
                <div className="order__top__title">
                    <div className="order__content">Mã đơn</div>
                    <div className="order__content">Ngày mua</div>
                    <div className="order__content">Số lượng</div>
                    <div className="order__content">Tổng tiền</div>
                    <div className="order__content">Tình trạng</div>
                    <div className="order__content">Người mua</div>
                    <div className="order__content order__detail">Chi tiết</div>
                </div>
            </div>
            <div className='list__order'>
                <Order></Order>
                <Order></Order>
                <Order></Order>
            </div>
        </main>
    );
}
