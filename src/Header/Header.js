import React from 'react';
import './Header.css'

function Header({ addWidthBody, setAddWidthBody }) {
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
                        <i className="far fa-bell" />
                    </div>
                    <div className="account__info__name">
                        <div className="header__img">
                            <img src="https://admin.thinkpro.vn//backend/uploads/product/avatar/2020/10/6/ideapad314gre_00.jpg" alt="" />
                        </div>
                        <div className="info__name">
                            <div className="position__name">Admin</div>
                            <div className="person__name">Nguyễn Phạm Minh Nhật</div>
                        </div>
                    </div>
                </div>

            </header>
        </div>
    );
}

export default Header;