import React, { useRef } from 'react';
import './Header.css'

function Header({ addWidthBody, setAddWidthBody }) {

    const user = useRef(JSON.parse(localStorage.getItem('infoUser')));


    const logout = () => {
        localStorage.clear();
        window.location.href = "http://localhost:3001";
    }

    const showSidebar = () => {
        setAddWidthBody(!addWidthBody)
    }
    return (
        <div>
            <header className={addWidthBody ? "header body-pd" : "header"} id="header">
                <div className="header__toggle" onClick={showSidebar}>
                    <i className={addWidthBody ? "fas fa-chevron-left" : "fas fa-chevron-right"} id="header-toggle" />
                </div>
                <div className="header__right">
                    <div className="notifications">
                        {/* <i className="far fa-bell" /> */}
                    </div>
                    <div className="account__info__name">
                        <div className="header__img">
                            <img src={user.current.avatar} alt="" />
                        </div>
                        <div className="info__name">
                            <div className="position__name">{user.current.type === 1 ? "Employee" : "Admin"}</div>
                            <div className="person__name">{user.current.name}</div>
                        </div>
                    </div>
                    <div className="btn__container__logout" onClick={logout}>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </header>
        </div>
    );
}

export default Header;