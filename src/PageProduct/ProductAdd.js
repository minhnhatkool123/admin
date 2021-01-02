import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

import FormError from './FormError'

import { SubBrandDell } from './SubBrandDell';
import { SubBrandAcer } from './SubBrandAcer';


export default function ProductAdd({ addproductshow, setAddproductshow, setInfoproducts, infoproducts }) {

    const [diSabled, setDisabled] = useState(true);
    const [subBrand, setSubBrand] = useState(SubBrandDell);
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
        // namebrand: false,
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


    const onInputChange = e => {
        if (status.current.value === "discount") {
            setDisabled(false);
        }
        else
            setDisabled(true);
    };

    const onInputChangeDetail = e => {

    }

    const onSubmit = () => {
        if (price.current.value < discount.current.value) {
            alert("Price < Discount");
            return;
        }

        if (status.current.value !== "discount")
            discount.current.value = 0;
        // if (subbrand.current.value === "")
        //     subbrand.current.value = "Latitude";

        const newProduct = {

            detail: {
                graphics: graphics.current.value,
                processor: processor.current.value,
                os: os.current.value,
                display: display.current.value,
                memory: memory.current.value,
                hardDrive: hardDrive.current.value,
                color: color.current.value,
                weight: weight.current.value,
                battery: battery.current.value,
                ports: ports.current.value,
            },
            images: image,
            sku: sku.current.value,
            name: name.current.value,
            price: price.current.value,
            warranty: warranty.current.value,
            brand: {
                name: brand.current.value,
                subBrand: subbrand.current.value,
            },
            status: status.current.value,
            discount: discount.current.value
        }


        axios.post('http://localhost:8080/api/product/laptop/add', newProduct).then(res => {


            const newListProduct = [...infoproducts];
            newListProduct.push(res.data);
            setInfoproducts(newListProduct);
            setEmptyAllInput();
            alert("Success");

        }).catch((error) => alert(error));

    }

    const addproductcontainer = useRef();
    const [image, setImage] = useState();
    const clickSaveProduct = () => {



        const result = {
            name: false,
            processor: false,
            display: false,
            memory: false,
            hardDrive: false,
            ports: false,
            graphics: false,
            sku: false,
            price: false,
            namebrand: false,
            status: false,
            discount: false
        };
        if (name.current.value === "" || processor.current.value === "" || display.current.value === "" || memory.current.value === "" || hardDrive.current.value === ""
            || ports.current.value === "" || graphics.current.value === "" || price.current.value === "" || sku.current.value === ""
            || brand.current.value === "" || status.current.value === "" || (discount.current.value === "" && diSabled === false)) {
            if (name.current.value === "") {
                result.name = true;
            }
            if (processor.current.value === "") {
                result.processor = true;
            }
            if (display.current.value === "")
                result.display = true;
            if (memory.current.value === "")
                result.memory = true;
            if (memory.current.value === "")
                result.hardDrive = true;
            if (ports.current.value === "")
                result.ports = true;
            if (graphics.current.value === "")
                result.graphics = true;
            if (price.current.value === "")
                result.price = true;
            if (sku.current.value === "")
                result.sku = true;
            if (brand.current.value === "")
                result.namebrand = true;
            if (status.current.value === "")
                result.status = true;
            if (discount.current.value === "" && diSabled === false)
                result.discount = true;
            console.log("RERS", result);
            setIsInputValid(result);
            return;
        }
        onSubmit();
        //setAddproductshow(!addproductshow);
    }


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            // const newProduct = {
            //     ...product,
            //     images: URL.createObjectURL(event.target.files[0]),
            // }
            //setProduct(newProduct);
            console.log(URL.createObjectURL(event.target.files[0]));
            setImage(URL.createObjectURL(event.target.files[0]));

        }
    }
    const setEmptyAllInput = () => {
        graphics.current.value = processor.current.value = os.current.value = display.current.value = memory.current.value = hardDrive.current.value = "";
        color.current.value = weight.current.value = battery.current.value = ports.current.value = status.current.value = "";
        sku.current.value = brand.current.value = name.current.value = price.current.value = warranty.current.value = discount.current.value = "";
        setImage("");
    }


    const handleClickOut = e => {
        if (addproductcontainer.current.contains(e.target)) {
            //console.log(e.target);
            return;
        }
        // outside click


        setEmptyAllInput();
        setIsInputValid(false);
        setAddproductshow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOut);
        return () => {
            document.removeEventListener("mousedown", handleClickOut);
        };
    }, [addproductshow]);

    const validateInput = (checkingText) => {
        if (checkingText === "")
            return true;
        else {
            return false;
        }
    }


    const handleInputValidation = (e) => {
        // console.log("E của error", e.target.value);
        let value = validateInput(e.target.value);
        setIsInputValid({ ...isInputValid, [e.target.name]: value });
        //setErrorMessage(errorMessage);

    }

    const ChangeSelect = () => {
        switch (brand.current.value) {
            case "Dell":
                setSubBrand(SubBrandDell);
                break;
            case "Acer":
                setSubBrand(SubBrandAcer);
                break;
        }

    }

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

                                    <select className="select__brand" ref={subbrand}>
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
                            <textarea rows={4} defaultValue={""} name="warranty" onChange={e => onInputChange(e)} ref={warranty} />
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
