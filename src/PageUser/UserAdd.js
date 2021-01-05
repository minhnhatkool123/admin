import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import FormError from '../ShowError/FormError';

export default function UserAdd({ addEmployeeShow, setAddEmployeeShow, infoEmployee, setInfoEmployee }) {
    const [isInputValid, setIsInputValid] = useState({
        password: false,
        username: false,
    });

    const name = useRef("");
    const phone = useRef("");
    const address = useRef("");
    const username = useRef("");
    const password = useRef("");
    const email = useRef("");
    const type = useRef("");
    const [image, setImage] = useState("");

    const addEmployeeContainer = useRef();

    const handleClickOutEmployee = e => {
        if (addEmployeeContainer.current.contains(e.target)) {
            //console.log(e.target);
            return;
        }
        // outside click
        setEmptyAllInput();
        setAddEmployeeShow(false);
    };

    const setEmptyAllInput = () => {
        name.current.value = phone.current.value = address.current.value = username.current.value = password.current.value = email.current.value = ""
        setImage("");
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutEmployee);
        return () => {
            document.removeEventListener("mousedown", handleClickOutEmployee);
        };
    }, [addEmployeeShow]);

    const onSubmit = () => {
        let loai;
        if (type.current.value === "1")
            loai = 1;
        else if (type.current.value === "2")
            loai = 2;

        const newEmployee = {
            name: name.current.value,
            phone: phone.current.value,
            address: address.current.value,
            username: username.current.value,
            password: password.current.value,
            avatar: image,
            email: email.current.value,
            type: loai,
        }


        axios.post('http://localhost:8080/api/account/register', newEmployee).then(res => {
            //console.log(newEmployee);
            console.log(res.data);
            const newListEmployee = [...infoEmployee];
            newListEmployee.push(res.data);
            setInfoEmployee(newListEmployee);

            alert("Success");
            setEmptyAllInput();
            //console(res.data);
        }).catch((error) => alert(error));
    }

    const clickSaveEmployee = () => {
        const result = {
            password: false,
            username: false,
        }
        //console.log("USERNAME", username.current.value.length);
        if ((username.current.value.length < 5 || username.current.value.length > 16) || (password.current.value.length < 5 || password.current.value.length > 16)) {
            if (username.current.value.length < 5 || username.current.value.length > 16)
                result.username = true;
            if (password.current.value.length < 5 || password.current.value.length > 16)
                result.password = true;
            setIsInputValid(result);
            return;
        }
        onSubmit();
    }

    const onImageChange = (e) => {
        const form = new FormData();
        form.append('image', e.target.files[0]);

        const key = 'fb47ea35cc2cccf63e71a490e83aa335';
        const url = `https://api.imgbb.com/1/upload?key=${key}`;
        fetch(url, {
            method: 'POST',
            body: form,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                //console.log(data);
                setImage(data.data.url)
            })
            .catch(function (error) {
                alert('error', error);
            });
    }

    const validateInput = (checkingText) => {
        if (checkingText.length < 16 && checkingText.length > 5)
            return false;
        else {
            return true;
        }
    }

    const handleInputValidation = (e) => {
        // console.log("E của error", e.target.value);
        let value = validateInput(e.target.value);
        setIsInputValid({ ...isInputValid, [e.target.name]: value });
        //setErrorMessage(errorMessage);

    }

    return (

        <div className={addEmployeeShow ? "add__product__container show__add__product" : "add__product__container"} ref={addEmployeeContainer}>
            <form className="add__product__container__content" >
                <div className="add__product__container__content__head">
                    <h5>New Employee</h5>
                    <div className>
                        <p>Add information and add new employee.</p>
                    </div>
                </div>
                <div className="add__product__container__content__body">
                    <div className="add__name__product">
                        <label htmlFor="form-lable">
                            Name
                    </label>
                        <div className="input__name__product">
                            <input type="text" name="name" ref={name} />
                        </div>
                    </div>

                    <div className="add__name__product">
                        <label htmlFor="form-lable">
                            Phone
                    </label>
                        <div className="input__name__product">
                            <input type="number" name="phone" autoComplete="off" ref={phone} />
                        </div>
                    </div>


                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Email
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="email" ref={email} />
                        </div>
                    </div>

                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Address
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="address" ref={address} autoComplete="off" />
                        </div>
                    </div>



                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Username
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="username" ref={username} autoComplete="off" onBlur={handleInputValidation} />
                        </div>
                    </div>
                    {isInputValid.username && <FormError errorMessage="Username must length 5-16 characters" />}


                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Password
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="password" ref={password} autoComplete="off" onBlur={handleInputValidation} />
                        </div>
                    </div>
                    {isInputValid.password && <FormError errorMessage="Password must length 5-16 characters" />}

                    {/* <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Username
                                </label>
                                <div className="input__regular__price">
                                    <input type="text" name="username" autoComplete="off" ref={username} onBlur={handleInputValidation} />
                                </div>
                            </div>
                            {isInputValid.username && <FormError errorMessage="Username must lenght 5-16 character" />}
                        </div>


                        <div className="add__error__container">
                            <div className="add__discount__price">
                                <label htmlFor="form-lable">
                                    Password
                                </label>
                                <div className="input__discount__price ">
                                    <input type="text" name="password" autoComplete="off" ref={password} onBlur={handleInputValidation} />
                                </div>
                            </div>
                            {isInputValid.password && <FormError errorMessage="Password must lenght 5-16 character" />}
                        </div>

                    </div> */}
                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Poistion
                            </label>
                                <div className="input__regular__price" >

                                    <select className="select__brand" ref={type}>
                                        <option value="2">Admin</option>
                                        <option value="1">Employee</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className="container__image__btn">
                        <div className="image__div__container__user">
                            <img src={image} alt="" />
                        </div>
                        <div className="flex__btn__imge__save">
                            <div className="add__image">
                                <input type="file" id="file2" accept="image/*" onChange={onImageChange} />
                                <label htmlFor="file2">Choose Image</label>
                            </div>
                            <div className="save__product__btn" id="sub_mit" onClick={clickSaveEmployee}>


                                <i className="fas fa-plus" />&nbsp;Save Employee
                        </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
