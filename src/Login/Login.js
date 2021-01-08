import React from 'react'
import './Login.css'
import axios from 'axios'
export default function Login({ history }) {

    const login = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username__login').value;
        const password = document.getElementById('password__login').value;

        if (username === "" || password === "") {
            alert("LOGIN FAIL");
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/api/account/login', {
                username: username,
                password: password,
                cms: true
            })
            console.log("DATA", res.data);
            if (res.data.result === "SUCCESS") {
                localStorage.setItem("infoUser", JSON.stringify(res.data.infoUser))
                localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
                history.push("/home");
            }
            else {
                console.log("EROOLOGION");
                alert("LOGIN FAIL");

            }
        } catch (error) {

        }

    }

    return (
        <div className="login">
            <form className="form__login">
                <h1>Sativa CMS</h1>
                <div className="container__form">
                    <div className="username__div">
                        <label className="username__label">Username</label>
                        <input id='username__login' type="text" className="username__input" />
                    </div>
                    <div className="pass__div">
                        <label className="pass__label">Password</label>
                        <input id='password__login' type="password" className="pass__input" />
                    </div>
                    <button className="btn__login" onClick={(e) => login(e)}>Login</button>
                </div>
            </form>
        </div>
    )
}
