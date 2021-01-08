import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Home.css'
import { formatMoney } from '../formatMoney';

export default function Home() {
    const [infoProducts, setInfoProducts] = useState([]);
    const [infoOrders, setInfoOrders] = useState([]);

    const GetDataProduct = async () => {

        const result = await axios.get("http://localhost:8080/api/product/laptop/");
        setInfoProducts(result.data);
    }

    useEffect(() => {
        GetDataProduct();
        return () => setInfoProducts();
    }, []);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/transaction/");
                console.log(res.data);
                setInfoOrders(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();
    }, []);
    const totalMoney = () => {
        let total = 0;
        infoOrders.forEach((element) => {
            if (element.status)
                total += element.total;
        })
        return total;
    }

    return (
        <main id='home__main'>
            <h1>DashBoard</h1>
            <div>
                {/* thống kê số liệu :v */}
                <div className="statistics">
                    <div className="card card__big prod__p__card card__red">
                        <div className="card__body">
                            <div className="card__row">
                                <div className="card__col">
                                    <h6>Doanh thu</h6>
                                    <h3>
                                        {formatMoney(totalMoney())} đ
                                    </h3>
                                </div>
                                <div className="card__col__auto">
                                    <i className="fas fa-money-bill-alt text__c__red f-18"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card card__big prod__p__card card__blue">
                        <div className="card__body">
                            <div className="card__row">
                                <div className="card__col">
                                    <h6>Hóa đơn</h6>
                                    <h3>{infoOrders.length}</h3>
                                </div>
                                <div className="card__col__auto">
                                    <i className="fas fa-scroll text__c__blue f-18"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card card__big prod__p__card card__orange">
                        <div className="card__body">
                            <div className="card__row">
                                <div className="card__col">
                                    <h6>Sản phẩm</h6>
                                    <h3>{infoProducts.length}</h3>
                                </div>
                                <div className="card__col__auto">
                                    <i className="fas fa-tags text__c__orange f-18"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product__main__body">
                    <div className="tag__name">
                        <div className="tag__name__name">
                            <span>Name</span>
                        </div>
                        <div className="tag__name__sku">
                            <span>SKU</span>
                        </div>
                        <div className="tag__name__branch">
                            <span>Branch</span>
                        </div>
                        <div className="tag__name__price">
                            <span>Price</span>
                        </div>
                        <div className="tag__name__stock">
                            <span>Total sell</span>
                        </div>
                    </div>
                    {/* top sp */}
                </div>
            </div>
        </main>
    )
}
