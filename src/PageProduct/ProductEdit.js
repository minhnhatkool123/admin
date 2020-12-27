import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

export default function ProductEdit({ editproductshow, setEditproductshow, setInfoproducts, infoproductedit }) {
    const [product, setProduct] = useState({
        title: "",
        sku: "",
        price: "",
        stock: "",
        branch: "",
        image: "https://admin.thinkpro.vn//backend/uploads/product/avatar/2020/10/6/ideapad314gre_00.jpg"
    })




    const { title, sku, price, stock, branch } = product;
    const loadProduct = () => {
        const newProduct = {
            ...infoproductedit,
        }
        //console.log("NEW PRO", newProduct);
        setProduct(newProduct);
    }
    useEffect(() => {
        loadProduct();
    }, [infoproductedit]);





    const onInputChange = e => {
        //console.log([e.target.name]);
        setProduct({ ...product, [e.target.name]: e.target.value });
        //console.log(e.target.value);
    };

    const loadAfterEdit = async () => {
        const result = await axios.get("http://localhost:3000/producttest");
        const newListProduct = [...result.data];
        setInfoproducts(newListProduct);
    }



    const onSubmit = () => {

        axios.put(`http://localhost:3000/producttest/${infoproductedit.id}`, product).then(res => {
            loadAfterEdit();

        }).catch((error) => alert(error));

    }




    const addproductcontainer = useRef();
    const [image, setImage] = useState();
    const clickSaveProduct = () => {
        onSubmit();
        setEditproductshow(!editproductshow);
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

        setEditproductshow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOut);
        return () => {
            document.removeEventListener("mousedown", handleClickOut);
        };
    }, []);

    return (
        <div className={editproductshow ? "add__product__container show__add__product" : "add__product__container"} ref={addproductcontainer}>
            <form className="add__product__container__content" >
                <div className="add__product__container__content__head">
                    <h5>Edit Product</h5>
                    <div className>
                        <p>Edit information.</p>
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
                                <input type="file" id="fileedit" accept="image/*" onChange={onImageChange} />
                                <label htmlFor="fileedit">Choose Image</label>
                            </div>
                            <div className="save__product__btn" id="sub_mit" onClick={clickSaveProduct} >

                                <i className="fas fa-plus" />&nbsp;Save Product
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
