import React, { useEffect, useState } from 'react'
import ProductBody from './ProductBody'
import './PageProduct.css'
import ProductAdd from './ProductAdd'
import axios from 'axios';
import ProductEdit from './ProductEdit';

export default function ProductMain({ addWidthBody }) {



    const [itemsearch, setItemsearch] = useState([]);
    const [valuesearch, setValuesearch] = useState("");


    const [infoproductedit, setInfoproductedit] = useState({
        detail: {
            graphics: "",
            processor: "",
            os: "",
            display: "",
            memory: "",
            hardDrive: "",
            color: "",
            weight: "",
            battery: "",
            ports: "",
        },
        images: "",
        sku: "",
        name: "",
        price: "",
        warranty: "",
        brand: {
            name: "",
            subBrand: "",
        },
        status: "",
        discount: ""
    });

    const [infoproducts, setInfoproducts] = useState([]);
    const getData = async () => {

        const result = await axios.get("http://localhost:8080/api/product/laptop/");
        setInfoproducts(result.data);
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

    // /product/
    const afterDelete = async id => {
        const result = await axios.delete(`http://localhost:8080/api/product/laptop/remove/${id}`);
        if (result.status === 200)
            alert("Delete Success");
        getData();
    }

    const clickdelmain = (product) => {
        console.log(product._id);
        const index = infoproducts.findIndex(x => x._id === product._id)

        let result = window.confirm("Do you want delete a laptop");
        if (result === true) {
            if (index < 0) {
                alert("Delete Fail");
                //console.log(product.id);
                return;
            }
            afterDelete(product._id);
        }
    }




    useEffect(() => {
        setItemsearch(
            infoproducts.filter(product => {
                return product.name.toLowerCase().includes(valuesearch.toLowerCase())
            })
        )

    }, [valuesearch, infoproducts])


    const clickeditmain = (product) => {
        setEditproductshow(!editproductshow);
        const newProduct = {
            ...product,
        }
        console.log("INFOR CUA SP:", newProduct);
        setInfoproductedit(newProduct);

    }
    return (
        <main id="product__main">
            <div className="product__main__top">
                <div className="product__main__top__col__left">
                    <h1>Product</h1>
                </div>
                <div className="product__main__top__col__right">
                    <div className="search__product">
                        <input type="text" className="input__serach" placeholder="Quick search name" onChange={e => setValuesearch(e.target.value)} />
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
            <ProductBody infoproducts={itemsearch} clickdel={clickdelmain} clickedit={clickeditmain} />
        </main>
    )
}
