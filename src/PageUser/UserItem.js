import React, { useEffect, useRef, useState } from 'react'

export default function UserItem({ employee, clickdel }) {
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


    const clickdelitem = (employee) => {
        setDropdownshow(!dropdownshow);
        clickdel(employee);
    }

    return (
        <div className="product__item">
            <div className="tag__name__check">
                <input type="checkbox" />
            </div>
            <div className="tag__name__name">
                <img src={employee.avatar} alt="hinhanh" />
                <span>
                    <strong>
                        {employee.name}
                    </strong>
                </span>
            </div>
            <div className="tag__name__sku">
                <span>
                    {employee.phone}
                </span>
            </div>
            <div className="tag__name__price">
                <span>
                    <strong>
                        {employee.address}
                    </strong>
                </span>
            </div>
            <div className="tag__name__stock">
                <span>
                    {employee.email}
                </span>
            </div>
            <div className="tag__name__branch">
                <span>
                    {employee.type === 1 ? "Employee" : "Admin"}

                </span>
            </div>
            <div className="tag__name__more" ref={moreEmployee}>
                <div className="btn__down" onClick={clickDropDownShow}>
                    <span className="material-icons">
                        more_horiz
                </span>
                </div>
                <div className={dropdownshow ? "dropdown-content__user showdropdown__user" : "dropdown-content__user"}>

                    <div className="dropdown__item__user" onClick={clickdelitem}>
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
