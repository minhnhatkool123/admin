import React, { useEffect, useState } from 'react'
import ProductBody from './ProductBody'
import './PageProduct.css'
import ProductAdd from './ProductAdd'
import axios from 'axios';
import ProductEdit from './ProductEdit';

export default function ProductMain({ addWidthBody }) {

    const [issearch, setIssearch] = useState(false);
    const [itemsearch, setItemsearch] = useState([]);

    const [infoproductedit, setInfoproductedit] = useState({
        title: "",
        sku: "",
        price: "",
        stock: "",
        branch: "",
        image: "",
    });

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
    const [editproductshow, setEditproductshow] = useState(false);
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


    // const loadUser = async () => {
    //     const result = await axios.get(`http://localhost:3000/producttest?title=1`);
    //     //setProduct(result.data);
    //     setInfoproductedit(result.data[0]);
    //     console.log("QWER", result.data);
    // }
    // useEffect(() => {
    //     loadUser();
    // }, []);

    const clickeditmain = (product) => {
        setEditproductshow(!editproductshow);
        const newProduct = {
            ...product,
        }
        setInfoproductedit(newProduct);
        //console.log("ID CUA SP:", infoproductedit);
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
            <div className={addWidthBody ? ((addproductshow || editproductshow) ? "shadow__container show__shadowhasnav" : "shadow__container") : ((addproductshow || editproductshow) ? "shadow__container show__shadownonav" : "shadow__container")}>
            </div>
            <ProductAdd addproductshow={addproductshow} setAddproductshow={setAddproductshow} setInfoproducts={setInfoproducts} infoproducts={infoproducts} />
            <ProductEdit editproductshow={editproductshow} setEditproductshow={setEditproductshow} setInfoproducts={setInfoproducts} infoproductedit={infoproductedit} />
            <ProductBody infoproducts={infoproducts} clickdel={clickdelmain} clickedit={clickeditmain} />
        </main>
    )
}
