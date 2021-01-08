import React, { useRef, useEffect, useState } from 'react';

import axios from 'axios'

import './PageAccount.css';

export default function Account({ history }) {
    const inputName = useRef(null);
    const inputPhone = useRef(null);
    const inputAddress = useRef(null);
    const inputEmail = useRef(null);
    const currentPassword = useRef(null);
    const newPassword = useRef(null);
    const confirmPassword = useRef(null);
    const avatar = useRef(null);
    const [avatarSrc, setAvatarSrc] = useState('');
    const [checkConfirmPassword, setCheckConfirmPassword] = useState(null);
    const [checkCorrectPassword, setCheckCorrectPassword] = useState(null);
    useEffect(() => {
        fillInformation();
    }, []);

    const fillInformation = () => {
        const userInformation = JSON.parse(localStorage.getItem('infoUser'));
        if (userInformation.name === undefined) return;
        avatar.current.src = userInformation.avatar;
        console.log(userInformation.avatar);
        inputName.current.value = userInformation.name;
        inputPhone.current.value = userInformation.phone;
        inputEmail.current.value = userInformation.email;
        inputAddress.current.value = userInformation.address;
    };
    const updateAccountInformationHandler = async () => {
        const user = JSON.parse(localStorage.getItem('infoUser'));
        let _avatar = avatarSrc;
        if (_avatar === '') _avatar = avatar.current.src;
        try {
            const res = await axios.put('http://localhost:8080/api/account/update/information', {
                username: user.username,
                avatar: _avatar,
                name: inputName.current.value,
                address: inputAddress.current.value,
                phone: inputPhone.current.value,
                email: inputEmail.current.value,
            });
            if (res.data.result === 'SUCCESS') {
                alert("SUCCESS");
                localStorage.setItem('infoUser', JSON.stringify(res.data.infoUser));
                fillInformation();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updatePasswordHandler = async () => {



        if (checkConfirmPassword === false || checkConfirmPassword === null) return;

        const user = JSON.parse(localStorage.getItem('infoUser'));

        try {
            const res = await axios.put('http://localhost:8080/api/account/update/password', {
                currentPassword: currentPassword.current.value,
                confirmPassword: confirmPassword.current.value,
                username: user.username,
            });
            if (res.data.result === 'SUCCESS') {
                alert("SUCCESS");
                setCheckConfirmPassword(null);
                setCheckCorrectPassword(null);
                newPassword.current.value = "";
                currentPassword.current.value = "";
                confirmPassword.current.value = "";
                //logoutHandler();
            } else if (res.data.result === 'INCORRECT_PASSWORD') {
                setCheckCorrectPassword(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const compareNewPassword = (e) => {
        if (newPassword.current.value !== confirmPassword.current.value)
            setCheckConfirmPassword(false);
        else setCheckConfirmPassword(true);
    };
    const compareConfirmPassword = (e) => {
        if (newPassword.current.value !== confirmPassword.current.value)
            setCheckConfirmPassword(false);
        else setCheckConfirmPassword(true);
    };

    function formHandle(e) {
        const form = new FormData();
        form.append('image', e.target.files[0]);

        const key = '7ad27d66522c6417d399ea2481da9dee';
        const url = `https://api.imgbb.com/1/upload?key=${key}`;
        fetch(url, {
            method: 'POST',
            body: form,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setAvatarSrc(data.data.url);
                avatar.current.src = data.data.url;
            })
            .catch(function (error) {
                alert('error', error);
            });
    }
    return (

        <div className='account-information-container'>

            <div className='account-information-right'>
                <div className='container-information'>
                    <h2 className='title'>Thông tin tài khoản</h2>
                    <div className='wrap-content'>
                        <div className='form-update'>
                            <div className='input-item w100'>
                                <div className='choose-avatar'>
                                    <div className='avatar'>
                                        <img
                                            src='https://i.ibb.co/T06rD5X/avatar-default.jpg'
                                            alt='avatar'
                                            ref={avatar}
                                        />
                                    </div>

                                    <label>
                                        <input type='file' id='inpFile' onChange={formHandle} />
                                        <span>Thay ảnh đại diện</span>
                                    </label>
                                </div>
                            </div>
                            <div className='input-item'>
                                <label htmlFor='name'>Họ và tên</label>
                                <input
                                    type='text'
                                    className='input-text'
                                    ref={inputName}
                                    tabIndex={1}
                                />
                            </div>
                            <div className='input-item'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='text'
                                    className='input-text'
                                    ref={inputEmail}
                                    tabIndex={2}
                                />
                            </div>
                            <div className='input-item'>
                                <label htmlFor='phone'>Số điện thoại</label>
                                <input
                                    type='text'
                                    className='input-text'
                                    ref={inputPhone}
                                    tabIndex={3}
                                />
                            </div>
                            <div className='input-item'>
                                <label htmlFor='address'>Địa chỉ</label>
                                <input
                                    type='text'
                                    className='input-text'
                                    ref={inputAddress}
                                    tabIndex={4}
                                />
                            </div>
                        </div>
                        <button
                            className='update-btn'
                            onClick={() => updateAccountInformationHandler()}>
                            Cập nhật
              </button>
                    </div>
                </div>

                <div className='container-information'>
                    <h2 className='title'>Thay đổi mật khẩu</h2>
                    <div className='wrap-content'>
                        <div className='form-update form-update-password'>
                            <div className='input-item'>
                                <label htmlFor='password'>Nhập mật khẩu mới</label>
                                <input
                                    type='password'
                                    className='input-text'
                                    onChange={(e) => compareNewPassword(e)}
                                    ref={newPassword}
                                    tabIndex={5}
                                />
                            </div>
                            <div className='input-item '>
                                <label htmlFor='password'>Xác nhận mật khẩu</label>
                                <input
                                    type='password'
                                    className='input-text'
                                    onChange={(e) => compareConfirmPassword(e)}
                                    ref={confirmPassword}
                                    tabIndex={6}
                                />
                                {checkConfirmPassword ===
                                    null ? null : checkConfirmPassword === true ? (
                                        <div className='notify correct'>
                                            <i class='far fa-check-circle' />
                                            <span>Mật khẩu khớp</span>
                                        </div>
                                    ) : (
                                            <div className='notify incorrect'>
                                                <i className='far fa-times-circle' />
                                                <span>Mật khẩu không khớp</span>
                                            </div>
                                        )}
                            </div>
                            <div className='input-item'>
                                <label htmlFor='password'>Nhập mật khẩu hiện tại</label>
                                <input
                                    tabIndex={7}
                                    type='password'
                                    className='input-text'
                                    ref={currentPassword}
                                />
                                {checkCorrectPassword === false ? (
                                    <div className='notify incorrect'>
                                        <i className='far fa-times-circle' />
                                        <span>Mật khẩu không đúng</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <button
                            className='update-btn'
                            onClick={() => updatePasswordHandler()}>
                            Cập nhật
              </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
