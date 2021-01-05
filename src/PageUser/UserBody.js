import React from 'react'
import UserItem from './UserItem'

export default function UserBody({ infoEmployee, clickdel }) {
    return (
        <div className="user__main__body">
            <div className="tag__name__user">
                <div className="tag__name__check__user">
                    <input type="checkbox" />
                </div>
                <div className="tag__name__name__user">
                    <span>Name</span>
                </div>
                <div className="tag__name__phone__user">
                    <span>Phone</span>
                </div>
                <div className="tag__name__birthday__user">
                    <span>Address</span>
                </div>
                <div className="tag__name__gmail__user">
                    <span>Email</span>
                </div>
                <div className="tag__name__sex__user">
                    <span>Position</span>
                </div>
                <div className="tag__name__more__user__user">
                    <div className="btn__down__top">
                        <span className="material-icons">
                            more_horiz
                     </span>
                    </div>
                </div>
            </div>
            {infoEmployee.map((employee, index) => {
                return (
                    <UserItem employee={employee} key={index} clickdel={() => clickdel(employee)} />

                )
            })}
        </div>
    )
}
