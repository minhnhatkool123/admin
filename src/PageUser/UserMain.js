import React, { useState } from 'react';
import './PageUser.css';
import UserAdd from './UserAdd';
import UserBody from './UserBody';
import UserEdit from './UserEdit';

export default function UserMain({ addWidthBody }) {
    const [addEmployeeShow, setAddEmployeeShow] = useState(false);

    const clickAddEmployeeShow = () => setAddEmployeeShow(!addEmployeeShow);
    return (
        <main id="product__user">
            <div className="user__main__top">
                <div className="user__main__top__col__left">
                    <h1>Employee</h1>
                </div>
                <div className="user__main__top__col__right">
                    <div className="search__user">
                        <input type="text" className="input__serach__user" placeholder="Quick search name" />
                        <div className>
                            <i className="fas fa-search" id="icon__search__user" />
                        </div>
                    </div>
                    <div className="add__user" onClick={clickAddEmployeeShow}>
                        <i className="fas fa-plus" id="icon__add__user" />
                    &nbsp;Add Employee
                     </div>
                </div>
            </div>
            <div className={addWidthBody ? ((addEmployeeShow) ? "shadow__container show__shadowhasnav" : "shadow__container") : ((addEmployeeShow) ? "shadow__container show__shadownonav" : "shadow__container")}>
            </div>
            <UserAdd addEmployeeShow={addEmployeeShow} setAddEmployeeShow={setAddEmployeeShow} />
            <UserBody />

        </main>
    )
}
