import React, { useEffect, useRef, useState } from 'react'

export default function UserItem() {
    const [dropdownshow, setDropdownshow] = useState(false);
    const clickDropDownShow = () => setDropdownshow(!dropdownshow);
    const moreEmployee = useRef();


    const handleClickOutEmployee = e => {
        if (moreEmployee.current.contains(e.target)) {

            return;
        }
        // outside click
        setDropdownshow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutEmployee);
        return () => {
            document.removeEventListener("mousedown", handleClickOutEmployee);
        };
    }, []);

    return (
        <div className="product__item">
            <div className="tag__name__check">
                <input type="checkbox" />
            </div>
            <div className="tag__name__name">
                <img src="https://admin.thinkpro.vn//backend/uploads/product/avatar/2020/10/6/ideapad314gre_00.jpg" alt="hinhanh" />
                <span>
                    <strong>
                        Nguyễn Phạm Minh Nguyệt Đinh Lý Trần Dương Anh
                    </strong>
                </span>
            </div>
            <div className="tag__name__sku">
                <span>
                    01297776554
                </span>
            </div>
            <div className="tag__name__price">
                <span>
                    <strong>
                        12/12/1200
                    </strong>
                </span>
            </div>
            <div className="tag__name__stock">
                <span>
                    dsadoksahdiasksao@gmail.com
                </span>
            </div>
            <div className="tag__name__branch">
                <span>
                    Nam
                </span>
            </div>
            <div className="tag__name__more" ref={moreEmployee}>
                <div className="btn__down" onClick={clickDropDownShow}>
                    <span className="material-icons">
                        more_horiz
                </span>
                </div>
                <div className={dropdownshow ? "dropdown-content__user showdropdown__user" : "dropdown-content__user"}>
                    <div className="dropdown__item__user">
                        <div>
                            <i className="far fa-edit" />
                            <span>Edit Employee</span>
                        </div>
                    </div>

                    <div className="dropdown__item__user" >
                        <div>
                            <i className="far fa-trash-alt" />
                            <span className='span'>Delete Employee</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
