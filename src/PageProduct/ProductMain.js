import React, { useEffect, useState } from 'react'
import ProductBody from './ProductBody'
import './PageProduct.css'
import ProductAdd from './ProductAdd'
import axios from 'axios';

export default function ProductMain({ addWidthBody }) {

    const [infoproducts, setInfoproducts] = useState([]);
    const getData = async () => {
        const result = await axios.get("http://localhost:3000/producttest");
        setInfoproducts(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        getData();
        return () => setInfoproducts();
    }, []);



    const [addproductshow, setAddproductshow] = useState(false);
    const clickAddProductShow = () => {
        setAddproductshow(!addproductshow);
    }


    const afterDelete = async id => {
        await axios.delete(`http://localhost:3000/producttest/${id}`);
        getData();
    }

    const clickdelmain = (product) => {
        console.log(product);
        const index = infoproducts.findIndex(x => x.id === product.id)
        if (index < 0) {
            alert("ko có id đó");
            //console.log(product.id);
            return;
        }

        afterDelete(product.id);
    }
    return (
        <main id="product__main">
            <div className="product__main__top">
                <div className="product__main__top__col__left">
                    <h1>Product</h1>
                </div>
                <div className="product__main__top__col__right">
                    <div className="search__product">
                        <input type="text" className="input__serach" placeholder="Quick search" />
                        <div className>
                            <i className="fas fa-search" id="icon__search" />
                        </div>
                    </div>
                    <div className="add__product" onClick={clickAddProductShow}>
                        <i className="fas fa-plus" id="icon__add" />
                        &nbsp;Add Product
                    </div>
                </div>
            </div>
            {/* {addproductshow && <ProductAdd />} */}
            <div className={addWidthBody ? (addproductshow ? "shadow__container show__shadowhasnav" : "shadow__container") : (addproductshow ? "shadow__container show__shadownonav" : "shadow__container")}>
            </div>
            <ProductAdd addproductshow={addproductshow} setAddproductshow={setAddproductshow} setInfoproducts={setInfoproducts} infoproducts={infoproducts} />
            <ProductBody infoproducts={infoproducts} clickdel={clickdelmain} />
        </main>
    )
}
