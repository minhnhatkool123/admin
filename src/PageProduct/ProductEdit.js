import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import FormError from './FormError'

import { SubBrandDell } from './SubBrandDell';
import { SubBrandAcer } from './SubBrandAcer';

export default function ProductEdit({ editproductshow, setEditproductshow, setInfoproducts, infoproductedit }) {

    const [subBrand, setSubBrand] = useState([]);
    const [diSabled, setDisabled] = useState(true);
    const [isInputValid, setIsInputValid] = useState({
        graphics: false,
        name: false,
        processor: false,
        display: false,
        memory: false,
        hardDrive: false,
        ports: false,
        price: false,
        sku: false,
        namebrand: false,
        status: false,
        // warranty: false,
        // subnamebrand: false,
        discount: false
    });

    const name = useRef("");
    const sku = useRef("");
    const brand = useRef("");
    const price = useRef("");
    const warranty = useRef("");
    const discount = useRef("");
    //const images = useRef("");
    const graphics = useRef("");
    const processor = useRef("");
    const os = useRef("");
    const display = useRef("");
    const memory = useRef("");
    const hardDrive = useRef("");
    const color = useRef("");
    const weight = useRef("");
    const battery = useRef("");
    const ports = useRef("");
    const subbrand = useRef("");
    const status = useRef("");



    const ChangeSelect = () => {
        switch (brand.current.value) {
            case "Dell":
                //alert("dell");
                setSubBrand(SubBrandDell);
                break;
            case "Acer":
                setSubBrand(SubBrandAcer);
                break;
        }
    }

    const DisableInputDiscount = () => {
        if (status.current.value === "discount") {
            setDisabled(false);
        }
        else
            setDisabled(true);
    }
    const setInforProduct = () => {

        name.current.value = infoproductedit.name;
        processor.current.value = infoproductedit.detail.processor;
        display.current.value = infoproductedit.detail.display;
        memory.current.value = infoproductedit.detail.memory;
        hardDrive.current.value = infoproductedit.detail.hardDrive;
        ports.current.value = infoproductedit.detail.ports;
        graphics.current.value = infoproductedit.detail.graphics;
        color.current.value = infoproductedit.detail.color;
        weight.current.value = infoproductedit.detail.weight;
        battery.current.value = infoproductedit.detail.battery;
        os.current.value = infoproductedit.detail.os;
        sku.current.value = infoproductedit.sku;
        price.current.value = infoproductedit.price;
        warranty.current.value = infoproductedit.warranty;
        brand.current.value = infoproductedit.brand.name;
        subbrand.current.value = infoproductedit.brand.subBrand;
        ChangeSelect();
        status.current.value = infoproductedit.status;
        discount.current.value = infoproductedit.discount;
        DisableInputDiscount();
    }
    useEffect(() => {
        //console.log(infoproductedit.detail);
        setInforProduct();
    }, [infoproductedit, subBrand])

    //const { title, sku, price, stock, branch } = product;
    // const loadProduct = () => {
    //     const newProduct = {
    //         ...infoproductedit,
    //     }
    //     //console.log("NEW PRO", newProduct);
    //     setProduct(newProduct);
    // }
    // useEffect(() => {
    //     loadProduct();
    // }, [infoproductedit]);





    const onInputChange = e => {
        if (status.current.value === "discount") {
            setDisabled(false);
        }
        else
            setDisabled(true);

    };

    const loadAfterEdit = async () => {
        const result = await axios.get("http://localhost:3000/producttest");
        const newListProduct = [...result.data];
        setInfoproducts(newListProduct);
    }



    const onSubmit = () => {
        console.log(name.current.value)
        // axios.put(`http://localhost:3000/producttest/${infoproductedit.id}`, product).then(res => {
        //     loadAfterEdit();

        // }).catch((error) => alert(error));

    }




    const addproductcontainer = useRef();
    const [image, setImage] = useState();
    const clickSaveProduct = () => {
        onSubmit();
        setEditproductshow(!editproductshow);
    }


    const onImageChange = (event) => {
        // if (event.target.files && event.target.files[0]) {

        //     const newProduct = {
        //         ...product,
        //         image: URL.createObjectURL(event.target.files[0]),
        //     }
        //     setProduct(newProduct);
        //     //setImage(URL.createObjectURL(event.target.files[0]));
        //     //product.image = event.target.files[0];
        // }
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

    const handleInputValidation = (e) => {
        // console.log("E của error", e.target.value);
        let value = validateInput(e.target.value);
        setIsInputValid({ ...isInputValid, [e.target.name]: value });
        //setErrorMessage(errorMessage);

    }



    const validateInput = (checkingText) => {
        if (checkingText === "")
            return true;
        else {
            return false;
        }
    }


    return (
        <div className={editproductshow ? "add__product__container show__add__product" : "add__product__container"} ref={addproductcontainer}>
            <form className="add__product__container__content" >
                <div className="add__product__container__content__head">
                    <h5>Edit Product</h5>
                    <div className>
                        <p>Edit information of product.</p>
                    </div>
                </div>
                <div className="add__product__container__content__body">
                    <div className="add__name__product">
                        <label htmlFor="form-lable">
                            Product Name
                        </label>
                        <div className="input__name__product">
                            <input type="text" name="name" onChange={e => onInputChange(e)} ref={name} onBlur={handleInputValidation} autoComplete="off" />
                        </div>
                    </div>
                    {isInputValid.name && <FormError errorMessage="Not Empty Name" />}
                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Processor
                        </label>
                        <div className="input__description">
                            <textarea rows={2} defaultValue={""} name="processor" onBlur={handleInputValidation} ref={processor} />
                        </div>
                    </div>
                    {isInputValid.processor && <FormError errorMessage="Not Empty Processor" />}

                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Display
                        </label>
                        <div className="input__description">
                            <textarea rows={2} defaultValue={""} name="display" onBlur={handleInputValidation} ref={display} />
                        </div>
                    </div>
                    {isInputValid.display && <FormError errorMessage="Not Empty Display" />}
                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Memory
                        </label>
                        <div className="input__description">
                            <textarea rows={2} defaultValue={""} name="memory" onBlur={handleInputValidation} ref={memory} />
                        </div>
                    </div>
                    {isInputValid.memory && <FormError errorMessage="Not Empty Memory" />}
                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Hard Drive
                        </label>
                        <div className="input__description">
                            <textarea rows={2} defaultValue={""} name="hardDrive" onBlur={handleInputValidation} ref={hardDrive} />
                        </div>
                    </div>
                    {isInputValid.hardDrive && <FormError errorMessage="Not Empty Hard Drive" />}

                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Ports
                        </label>
                        <div className="input__description">
                            <textarea rows={2} defaultValue={""} name="ports" onBlur={handleInputValidation} ref={ports} />
                        </div>
                    </div>
                    {isInputValid.ports && <FormError errorMessage="Not Empty Ports" />}
                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Graphics
                        </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="graphics" onBlur={handleInputValidation} ref={graphics} />
                        </div>
                    </div>
                    {isInputValid.graphics && <FormError errorMessage="Not Empty Graphics" />}
                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Color
                            </label>
                                <div className="input__regular__price">
                                    <input type="text" name="color" ref={color} onBlur={handleInputValidation} autoComplete="off" />
                                </div>
                            </div>

                        </div>


                        <div className="add__error__container">
                            <div className="add__discount__price">
                                <label htmlFor="form-lable">
                                    Weight
                            </label>
                                <div className="input__discount__price ">
                                    <input type="text" name="weight" ref={weight} onBlur={handleInputValidation} autoComplete="off" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Battery
                            </label>
                                <div className="input__regular__price">
                                    <input type="text" name="battery" ref={battery} onBlur={handleInputValidation} autoComplete="off" />
                                </div>
                            </div>
                            {/* {isInputValid.stock && <FormError errorMessage="Not Empty Stock" />} */}
                        </div>


                        <div className="add__error__container">
                            <div className="add__discount__price">
                                <label htmlFor="form-lable">
                                    OS
                            </label>
                                <div className="input__discount__price ">
                                    <input type="text" name="os" ref={os} onBlur={handleInputValidation} autoComplete="off" />
                                </div>
                            </div>
                            {/* {isInputValid.sku && <FormError errorMessage="Not Empty SKU" />} */}
                        </div>

                    </div>
                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Regular Price
                             </label>
                                <div className="input__regular__price">
                                    <input type="number" name="price" ref={price} onBlur={handleInputValidation} autoComplete="off" />
                                </div>
                            </div>
                            {isInputValid.price && <FormError errorMessage="Not Empty Price" />}
                        </div>


                        <div className="add__error__container">
                            <div className="add__discount__price">
                                <label htmlFor="form-lable">
                                    SKU
                            </label>
                                <div className="input__discount__price ">
                                    <input type="text" name="sku" ref={sku} onBlur={handleInputValidation} autoComplete="off" />
                                </div>
                            </div>
                            {isInputValid.sku && <FormError errorMessage="Not Empty SKU" />}
                        </div>




                    </div>
                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Brand
                            </label>
                                <div className="input__regular__price">
                                    {/* <input type="text" name="brand" onChange={e => onInputChange(e)} ref={brand} onBlur={handleInputValidation} autoComplete="off" /> */}
                                    <select name="namebrand" className="select__brand" onChange={ChangeSelect} ref={brand} onBlur={handleInputValidation}>
                                        <option value="Dell">Dell</option>
                                        <option value="HP">HP</option>
                                        <option value="Asus">Asus</option>
                                        <option value="Acer">Acer</option>
                                        <option value="Lenovo">Lenovo</option>
                                        <option value="Razer">Razer</option>
                                    </select>
                                </div>
                            </div>
                            {isInputValid.namebrand && <FormError errorMessage="Not Empty Brand" />}
                        </div>


                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Sub Brand
                            </label>
                                <div className="input__regular__price">
                                    <select className="select__brand" ref={subbrand} >
                                        {subBrand.map((item) => {
                                            return (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Status Product
                            </label>
                                <div className="input__regular__price">
                                    <select name="status" className="select__brand" ref={status} onBlur={handleInputValidation} onChange={e => onInputChange(e)}>
                                        <option value="incoming">In Coming</option>
                                        <option value="in_stock">In Stock</option>
                                        <option value="discount">Discount</option>
                                    </select>
                                </div>
                            </div>
                            {isInputValid.status && <FormError errorMessage="Not Empty Status" />}
                        </div>


                        <div className="add__error__container">
                            <label htmlFor="form-lable">
                                Discount Price
                             </label>
                            <div className="input__discount__price">
                                <input type="number" name="discount" onBlur={handleInputValidation} onChange={e => onInputChange(e)} ref={discount} autoComplete="off" disabled={diSabled ? "disabled" : ""} />
                            </div>
                            {isInputValid.discount && !diSabled && <FormError errorMessage="Not Empty Discount" />}
                        </div>
                    </div>

                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Warranty
                        </label>
                        <div className="input__description">
                            <textarea rows={4} defaultValue={""} name="warranty" ref={warranty} />
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


                                <i className="fas fa-plus" />&nbsp;Save Product
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
