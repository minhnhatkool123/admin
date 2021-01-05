import React, { useRef, useState } from 'react';



export default function Order({ order, index, clickConfirm }) {



    const [activeUser, setActiveUser] = useState(false);
    const [activeOrder, setActiveOrder] = useState(false);

    const showDetailOrder = () => {

        setActiveOrder(!activeOrder);


    }

    const showDetailUser = () => {
        setActiveUser(!activeUser);

    }

    const clickConfirmOrder = (order) => {
        // const newOrder = { ...order, status: true };
        // axios.put(`http://localhost:8080/api/product/laptop/edit/${order._id}`, newOrder).then(res => {


        // }).catch((error) => alert(error));
        clickConfirm(order);
    }

    return (
        <div className="order">
            <div className="order__top">
                <div className="order__content__">{index + 1}</div>
                <div className="order__content__">{order.date}</div>
                <div className="order__content__">{order.products.length}</div>
                <div className="order__content__">{order.total} đ</div>
                <div className="order__content__btn__accept" >
                    <div className={order.status === false ? "btn__accept" : "btn__accept disable__confirm__btn"} onClick={clickConfirmOrder}>
                        {order.status === true ? "  Đã Xác nhận" : "Xác nhận"}
                    </div>
                </div>
                <div className="order__content__">
                    <button className="btn__user" onClick={showDetailUser}>
                        <i className="fas fa-user"></i>
                    </button>
                </div>
                <div className="order__content__ order__detail__">
                    <button className='btn__'
                        onClick={showDetailOrder}>
                        <i className={activeOrder ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
                    </button>
                </div>
            </div>

            {/* Thông tin khách hàng */}
            <div className={activeUser ? "order__bot__user show__detail__user" : "order__bot__user"}>
                <div className="order__bot__user__left">
                    <h3>{order.customer.name}</h3>
                    <h4>{order.customer.phone}</h4>
                </div>
                <div className="order__bot__user__right">
                    <h3>Địa chỉ:</h3>
                    <p>{order.customer.address}</p>
                </div>
            </div>

            {/* Thông tin các sp trong đơn hàng */}
            <div className={activeOrder ? "order__bot__detail show__detail__order" : "order__bot__detail"} >
                {
                    order.products.map((product, i) => {
                        return <ItemProduct key={i} product={product} />;
                    })
                }

            </div>
        </div>
    );
}

const ItemProduct = ({ product }) => {
    console.log(product);
    return (
        <div className='item'>
            <div className="container__item__content__order">
                <div className='item__avatar'>
                    <img className='avatar' src={product.image} alt='hinh laptop' />
                </div>
                <div className='item__content'>
                    <h3 className='content'>{product.productName}</h3>
                    <p>SKU: {product.sku}</p>
                </div>
            </div>

            <div className='item__price'>
                <div className='price'>
                    <strong>{product.price - product.discount} ₫</strong>
                </div>
                {product.discount !== 0 ? (
                    <div className='price-discount'>
                        <strike>{product.price} ₫</strike>
                    </div>
                ) : null}
            </div>
        </div>
    );
};