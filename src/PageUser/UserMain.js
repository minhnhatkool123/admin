import React, { useEffect, useState } from 'react';
import './PageUser.css';
import UserAdd from './UserAdd';
import UserBody from './UserBody';
import axios from 'axios';

export default function UserMain({ addWidthBody }) {
    const [itemsearch, setItemsearch] = useState([]);
    const [valuesearch, setValuesearch] = useState("");
    const [addEmployeeShow, setAddEmployeeShow] = useState(false);
    const [infoEmployee, setInfoEmployee] = useState([]);

    const getData = async () => {
        const result = await axios.get("http://localhost:8080/api/account/");
        setInfoEmployee(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        getData();
        return () => setInfoEmployee();
    }, []);

    const afterDelete = async id => {
        const result = await axios.delete(`http://localhost:8080/api/account/remove/${id}`);
        if (result.status === 200)
            alert("Delete Success");
        getData();
    }

    const clickdelmain = (employee) => {
        console.log(employee._id);
        const index = infoEmployee.findIndex(x => x._id === employee._id)

        let result = window.confirm("Do you want delete a employee?");
        if (result === true) {
            if (index < 0) {
                alert("Delete Fail");
                //console.log(product.id);
                return;
            }
            afterDelete(employee._id);
        }
    }

    useEffect(() => {
        setItemsearch(
            infoEmployee.filter(employee => {
                return employee.name.toLowerCase().includes(valuesearch.toLowerCase())
            })
        )

    }, [valuesearch, infoEmployee])

    const clickAddEmployeeShow = () => setAddEmployeeShow(!addEmployeeShow);
    return (
        <main id="product__user">
            <div className="user__main__top">
                <div className="user__main__top__col__left">
                    <h1>Employee</h1>
                </div>
                <div className="user__main__top__col__right">
                    <div className="search__user">
                        <input type="text" className="input__serach__user" placeholder="Quick search name" onChange={e => setValuesearch(e.target.value)} />
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
            <UserAdd addEmployeeShow={addEmployeeShow} setAddEmployeeShow={setAddEmployeeShow} infoEmployee={infoEmployee} setInfoEmployee={setInfoEmployee} />
            <UserBody infoEmployee={itemsearch} setInfoEmployee={setInfoEmployee} clickdel={clickdelmain} />

        </main>
    )
}
