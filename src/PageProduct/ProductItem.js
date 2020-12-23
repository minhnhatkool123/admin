import React, { useEffect, useRef, useState } from 'react'

export default function ProductItem() {
    const [dropdownshow, setDropdownshow] = useState(false);
    const clickDropDownShow = () => setDropdownshow(!dropdownshow);
    const more = useRef();

    const handleClickOut = e => {
        if (more.current.contains(e.target)) {
            //console.log(e.target);
            return;
        }
        // outside click
        setDropdownshow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOut);
        return () => {
            document.removeEventListener("mousedown", handleClickOut);
        };
    }, []);


    return (
        <div className="product__item">
            <div className="tag__name__check">
                <input type="checkbox" />
            </div>
            <div className="tag__name__name">
                <img src="https://admin.thinkpro.vn//backend/uploads/product/avatar/2020/10/6/ideapad314gre_00.jpg" />
                <span>
                    <strong>
                        Asus Vivobook 14 A415
            </strong>
                </span>
            </div>
            <div className="tag__name__sku">
                <span>Vivobooka41504CF</span>
            </div>
            <div className="tag__name__price">
                <span>
                    <strong>18.290.000 ₫</strong>
                </span>
            </div>
            <div className="tag__name__stock">
                <span>10</span>
            </div>
            <div className="tag__name__branch">
                <span>
                    TUF/ROG Gaming
                 </span>
            </div>
            <div className="tag__name__more" ref={more}>
                <div className="btn__down" onClick={clickDropDownShow}>
                    <span className="material-icons">
                        more_horiz
                    </span>
                </div>
                <div id="myDropdown" className={dropdownshow ? "dropdown-content showdropdown" : "dropdown-content"}>
                    <div className="dropdown__item">
                        <a href="#home">
                            <i className="far fa-edit" />
                            <span>Edit Product</span>
                        </a>
                    </div>
                    <div className="dropdown__item">
                        <a href="#about">
                            <i className="far fa-eye" />
                            <span>View Product</span>
                        </a>
                    </div>
                    <div className="dropdown__item">
                        <a href="#contact">
                            <i className="far fa-trash-alt" />
                            <span>Delete Product</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}