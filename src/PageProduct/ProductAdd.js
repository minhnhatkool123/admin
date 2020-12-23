import React, { useEffect, useRef, useState } from 'react'

export default function ProductAdd({ addproductshow, setAddproductshow }) {

    const addproductcontainer = useRef();
    const [image, setImage] = useState();
    const clickSaveProduct = () => setAddproductshow(!addproductshow);

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


    return (
        <div className={addproductshow ? "add__product__container show__add__product" : "add__product__container"} ref={addproductcontainer}>
            <div className="add__product__container__content">
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
                            <input type="text" />
                        </div>
                    </div>
                    <div className="price__flex">
                        <div className="add__regular__price">
                            <label htmlFor="form-lable">
                                Regular Price
                </label>
                            <div className="input__regular__price">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="add__discount__price">
                            <label htmlFor="form-lable">
                                Discount Price
                </label>
                            <div className="input__discount__price">
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="price__flex">
                        <div className="add__regular__price">
                            <label htmlFor="form-lable">
                                Stock
                            </label>
                            <div className="input__regular__price">
                                <input type="text" />
                            </div>
                        </div>
                        <div className="add__discount__price">
                            <label htmlFor="form-lable">
                                SKU
                            </label>
                            <div className="input__discount__price">
                                <input type="text" />
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
                            <img src={image} id="upload__image" />
                        </div>
                        <div className="flex__btn__imge__save">
                            <div className="add__image">
                                <input type="file" id="file" accept="image/*" onChange={onImageChange} />
                                <label htmlFor="file">Choose Image</label>
                            </div>
                            <div className="save__product__btn" id="sub_mit" onClick={clickSaveProduct}>
                                <i className="fas fa-plus" />
                                 &nbsp;Save Product
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
