import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';


function Navbar({ addWidthBody }) {

    const [type, setType] = useState(JSON.parse(localStorage.getItem("infoUser")).type);
    // const showSidebar = () => {
    //     setAddWidthBody(!addWidthBody)
    // }
    const [activeicon, setActiveicon] = useState(() => {
        const initActiveIcon = localStorage.getItem("icon_active") || 0;
        //console.log("ACTIVE ICON", initActiveIcon);
        return initActiveIcon;
    });
    //const [listactive, setListactive] = useState(SidebarData);
    const clickIcon = (index) => {
        setType(JSON.parse(localStorage.getItem("infoUser")).type);
        console.log("TYPDE", type);
        if (index === 1 && type === 1)
            return;

        setActiveicon(index)
        console.log("click icon", index);
        localStorage.setItem("icon_active", index);
    }

    return (

        <div className={addWidthBody ? "l-navbar show" : "l-navbar"} id="nav-bar">
            <nav className="nav">
                <div>
                    <div className="nav__logo">
                        <i className="fab fa-google nav__logo-icon" />
                        <span className="nav__logo-name">SATIVA</span>
                    </div>

                    <div className="nav__list">
                        {SidebarData.map((item, index) => {
                            return (

                                <> {(index === 1 && type === 1) ? <div key={index} className={item.cName + (index == activeicon ? " active" : "")} to={item.path} onClick={() => clickIcon(index)}>
                                    <i className={item.icon}></i>
                                    <span className={item.spanName}>{item.title}</span>
                                </div> : <Link key={index} className={item.cName + (index == activeicon ? " active" : "")} to={item.path} onClick={() => clickIcon(index)}>
                                        <i className={item.icon}></i>
                                        <span className={item.spanName}>{item.title}</span>
                                    </Link>}</>

                            )
                        })}
                    </div>
                </div>
            </nav>
        </div >
    );

}

export default Navbar;