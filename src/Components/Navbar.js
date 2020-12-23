import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';


function Navbar({ addWidthBody }) {

    // const showSidebar = () => {
    //     setAddWidthBody(!addWidthBody)
    // }
    const [activeicon, setActiveicon] = useState("true");


    return (

        <div className={addWidthBody ? "l-navbar show" : "l-navbar"} id="nav-bar">
            <nav className="nav">
                <div>
                    <Link to="/" className="nav__logo">
                        <i className="fab fa-google nav__logo-icon" />
                        <span className="nav__logo-name">MNKOOL</span>
                    </Link>

                    <div className="nav__list">
                        {SidebarData.map((item, index) => {
                            return (
                                <Link key={index} className={item.cName} to={item.path}>
                                    <i className={item.icon}></i>
                                    <span className={item.spanName}>{item.title}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Navbar;