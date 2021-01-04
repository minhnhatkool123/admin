import React from 'react'
import UserItem from './UserItem'

export default function UserBody() {
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
                    <span>Birthday</span>
                </div>
                <div className="tag__name__gmail__user">
                    <span>Gmail</span>
                </div>
                <div className="tag__name__sex__user">
                    <span>Sex</span>
                </div>
                <div className="tag__name__more__user__user">
                    <div className="btn__down__top">
                        <span className="material-icons">
                            more_horiz
                     </span>
                    </div>
                </div>
            </div>
            <UserItem />
        </div>
    )
}
