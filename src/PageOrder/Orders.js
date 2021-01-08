import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Order from './Order';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Orders.css';
export default function Orders() {


    const [itemsearch, setItemsearch] = useState([]);

    const [selectDate, setSelectDate] = useState("");

    const [timeToday, setTimeToday] = useState(null);
    const [infoOrder, setInfoOrder] = useState([]);






    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/transaction/");
                //console.log(res.data);
                setInfoOrder(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();
    }, []);

    const loadAfterComfirm = async () => {
        const result = await axios.get("http://localhost:8080/api/transaction/");
        const newListOrder = [...result.data];
        setInfoOrder(newListOrder);
    }

    const clickConfirmOrderMain = (order) => {
        if (order.status === true)
            return;

        const newOrder = { ...order, status: true };
        //console.log("NEW ORDER", newOrder);
        let result = window.confirm("Do you want comfirm");
        if (result === true) {
            axios.put(`http://localhost:8080/api/transaction/${order._id}`, newOrder).then(res => {
                loadAfterComfirm();
            }).catch((error) => alert(error));
        }
        //console.log(order._id);
    }

    useEffect(() => {
        if (timeToday === null)
            setItemsearch(infoOrder);
        else
            setItemsearch(
                infoOrder.filter(order => {

                    return order.date.includes(selectDate);
                })
            )

    }, [selectDate, infoOrder])
    const selectDateTime = (date) => {

        let today = new Date(date);
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        // console.log("NGÀY", day);
        // console.log("THÁNG", month);
        // console.log("NĂM", year);
        let tonghop = day + "-" + month + "-" + year;

        console.log(date);

        //console.log("NGÀYTHÁNGNĂM", tonghop);
        setSelectDate(tonghop);
        setTimeToday(date);
    }

    return (
        <main id='order__main'>
            <div className="flex__container__order">
                <h1>Orders</h1>
                <DatePicker className="position__" onChange={date => selectDateTime(date)} selected={timeToday} dateFormat="dd/MM/yyy" isClearable placeholderText="Select Date" />
            </div>
            <div className='order__title'>
                <div className='order__top__title'>
                    <div className='order__content'>
                        <span>Mã đơn</span>
                    </div>
                    <div className='order__content'>
                        <span>Ngày mua</span>
                    </div>
                    <div className='order__content'>
                        <span>Số lượng</span>
                    </div>
                    <div className='order__content'>
                        <span>Tổng tiền</span>
                    </div>
                    <div className='order__content'>
                        <span>Tình trạng</span>
                    </div>
                    <div className='order__content'>
                        <span>Nguoi dung</span>
                    </div>
                    <div className='order__content'>
                        <span>Chi tiết</span>
                    </div>
                </div>
            </div>
            {/* <div className='list__order'>
                {orders.map((order, i) => {
                    return <Order order={order} key={i} index={i} />;
                })}
                
            </div> */}
            <div className='list__order'>
                {itemsearch.length !== 0 && itemsearch.map((order, i) => {
                    return <Order order={order} key={i} index={i} clickConfirm={() => clickConfirmOrderMain(order)} setInfoOrder={setInfoOrder} />
                })}
            </div>
        </main >
    );
}


