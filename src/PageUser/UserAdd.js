import React, { useEffect, useRef } from 'react'

export default function UserAdd({ addEmployeeShow, setAddEmployeeShow }) {

    const addEmployeeContainer = useRef();

    const handleClickOutEmployee = e => {
        if (addEmployeeContainer.current.contains(e.target)) {
            //console.log(e.target);
            return;
        }
        // outside click
        setAddEmployeeShow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutEmployee);
        return () => {
            document.removeEventListener("mousedown", handleClickOutEmployee);
        };
    }, [addEmployeeShow]);



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
                            <input type="text" name="name" autoComplete="off" />
                        </div>
                    </div>

                    <div className="add__name__product">
                        <label htmlFor="form-lable">
                            Birthday
                    </label>
                        <div className="input__name__product">
                            <input type="date" name="" autoComplete="off" />
                        </div>
                    </div>

                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Phone
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} />
                        </div>
                    </div>


                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Gmail
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="display" />
                        </div>
                    </div>

                    <div className="add__description">
                        <label htmlFor="form-lable">
                            Address
                    </label>
                        <div className="input__description">
                            <textarea rows={1} defaultValue={""} name="memory" />
                        </div>
                    </div>


                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Username
                        </label>
                                <div className="input__regular__price">
                                    <input type="text" name="color" autoComplete="off" />
                                </div>
                            </div>

                        </div>


                        <div className="add__error__container">
                            <div className="add__discount__price">
                                <label htmlFor="form-lable">
                                    Password
                                </label>
                                <div className="input__discount__price ">
                                    <input type="text" name="weight" autoComplete="off" />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="price__flex">
                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Sex
                            </label>
                                <div className="input__regular__price">
                                    {/* <input type="text" name="brand" onChange={e => onInputChange(e)} ref={brand} onBlur={handleInputValidation} autoComplete="off" /> */}
                                    <select name="namebrand" className="select__brand" >
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                </div>
                            </div>

                        </div>


                        <div className="add__error__container">
                            <div className="add__regular__price">
                                <label htmlFor="form-lable">
                                    Poistion
                            </label>
                                <div className="input__regular__price">

                                    <select className="select__brand">
                                        <option value="0">Admin</option>
                                        <option value="1">Employee</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className="container__image__btn">
                        <div className="image__div__container__user">
                            <img src="https://i.pinimg.com/originals/14/f1/01/14f101a28f7bf7f860f3b3a8fd3fae4c.png" alt="" />
                        </div>
                        <div className="flex__btn__imge__save">
                            <div className="add__image">
                                <input type="file" id="file2" accept="image/*" />
                                <label htmlFor="file2">Choose Image</label>
                            </div>
                            <div className="save__product__btn" id="sub_mit" >


                                <i className="fas fa-plus" />&nbsp;Save Employee
                        </div>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
