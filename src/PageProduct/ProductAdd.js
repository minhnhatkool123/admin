import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { v1 as uuidv1 } from 'uuid';
import _uniqueId from 'lodash/uniqueId';


export default function ProductAdd({ addproductshow, setAddproductshow, setInfoproducts, infoproducts }) {

    const [product, setProduct] = useState({
        id: "",
        title: "",
        sku: "",
        price: "",
        stock: "",
        branch: "",
        image: "https://admin.thinkpro.vn//backend/uploads/product/avatar/2020/10/6/ideapad314gre_00.jpg"
    })


    const { title, sku, price, stock, branch } = product;

    const onInputChange = e => {
        //console.log([e.target.name]);
        setProduct({ ...product, [e.target.name]: e.target.value, ["id"]: uuidv1() });
        //console.log(e.target.value);
    };

    const onSubmit = () => {
        //e.preventDefault();
        // const newProuct = {
        //     id: 5,
        //     ...product,
        // };
        // setProduct({ newProuct });
        //http://jsonplaceholder.typicode.com/users

        // const newProduct = {
        //     ...product,
        //     [id]: uuidv1(),
        // };

        // setProduct({ newProduct });
        console.log(product);

        axios.post('http://localhost:3000/producttest', product).then(res => {
            if (res.status === 201) {


                const newListProduct = [...infoproducts];
                newListProduct.push(product);
                setInfoproducts(newListProduct);
            }
            else {
                //console.log("status test", res.statusText);
                alert("thêm sản phẩm thất bại");
            }

        }).catch((error) => alert(error));
        // await axios.post("http://localhost:3000/producttest", product);
        // history.push("/products");
        //setProduct(newProuct);
    }

    const addproductcontainer = useRef();
    const [image, setImage] = useState();
    const clickSaveProduct = () => {
        onSubmit();
        setAddproductshow(!addproductshow);
    }


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {

            setImage(URL.createObjectURL(event.target.files[0]));

        }
    }

    const handleClickOut = e => {
        if (addproductcontainer.current.contains(e.target)) {
            //console.log(e.target);
            return;
        }
        // outside click
        setAddproductshow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOut);
        return () => {
            document.removeEventListener("mousedown", handleClickOut);
        };
    }, []);
    // onSubmit={e => onSubmit(e)}
    return (
        <div className={addproductshow ? "add__product__container show__add__product" : "add__product__container"} ref={addproductcontainer}>
            <form className="add__product__container__content" >
                <div className="add__product__container__content__head">
                    <h5>New Product</h5>
                    <div className>
                        <p>Add information and add new product.</p>
                    </div>
                </div>
                <div className="add__product__container__content__body">
                    <div className="add__name__product">
                        <label htmlFor="form-lable">
                            Product Title
                        </label>
                        <div className="input__name__product">
                            <input type="text" name="title" onChange={e => onInputChange(e)} value={title} />
                        </div>
                    </div>
                    <div className="price__flex">
                        <div className="add__regular__price">
                            <label htmlFor="form-lable">
                                Regular Price
                             </label>
                            <div className="input__regular__price">
                                <input type="text" name="price" onChange={e => onInputChange(e)} value={price} />
                            </div>
                        </div>
                        <div className="add__discount__price">
                            <label htmlFor="form-lable">
                                Discount Price
                             </label>
                            <div className="input__discount__price">
                                <input type="text" name="branch" onChange={e => onInputChange(e)} value={branch} />
                            </div>
                        </div>
                    </div>
                    <div className="price__flex">
                        <div className="add__regular__price">
                            <label htmlFor="form-lable">
                                Stock
                            </label>
                            <div className="input__regular__price">
                                <input type="text" name="stock" onChange={e => onInputChange(e)} value={stock} />
                            </div>
                        </div>
                        <div className="add__discount__price">
                            <label htmlFor="form-lable">
                                SKU
                            </label>
                            <div className="input__discount__price">
                                <input type="text" name="sku" onChange={e => onInputChange(e)} value={sku} />
                            </div>
                        </div>
                    </div>
                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Description
                        </label>
                        <div className="input__description">
                            <textarea rows={4} defaultValue={""} />
                        </div>
                    </div>
                    <div className="container__image__btn">
                        <div className="image__div__container">
                            <img src={image} id="upload__image" alt="" />
                        </div>
                        <div className="flex__btn__imge__save">
                            <div className="add__image">
                                <input type="file" id="file" accept="image/*" onChange={onImageChange} />
                                <label htmlFor="file">Choose Image</label>
                            </div>
                            <div className="save__product__btn" id="sub_mit" onClick={clickSaveProduct} >
                                {/* <input type="submit" id="submit"></input>
                                <label htmlFor="submit"><i className="fas fa-plus" />&nbsp;Save Product</label> */}

                                <i className="fas fa-plus" />&nbsp;Save Product
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
