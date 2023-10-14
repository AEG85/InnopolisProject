import React, { useEffect, useState } from 'react'
import { InputText } from '../../components/input-text';

import './styles.css';


export const Login = () => {

    const [isSign, setSign] = useState<boolean>(false)
    const [userLoginAuth, setUserLoginAuth] = useState<string>('')
    const [userPassAuth, setUserPassAuth] = useState<string>('')
    const [userLogin, setUserLogin] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPass1, setUserPass1] = useState<string>('')
    const [userPass2, setUserPass2] = useState<string>('')
    const [isPassError, setPassError] = useState<boolean>(false)


    const handleChangeLoginAuth = (event: any) => {
        setUserLoginAuth(event.target.value)
    }
    const handleChangePassAuth = (event: any) => {
        setUserPassAuth(event.target.value)
    }

    const handleChangePass1 = (event: any) => {
        setUserPass1(event.target.value)
    }

    const handleChangePass2 = (event: any) => {
        if (userPass1 !== event.target.value) {
            setPassError(true)
        } else {
            setPassError(false)
        }
    }

    const handleClickSign = () => {
        setSign(!isSign)
    }

    const handleChangeLogin = (e: any) => {
        setUserLogin(e.target.value)
    }
    const handleChangeEmail = (e: any) => {
        setUserEmail(e.target.value)
    }


    const handleClickLogin = () => {
        fetch("http://localhost:4040/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                login: userLogin,
                password: userPass1
            })
        })
    }

    const handleClickAuth = () => {
        fetch(`http://localhost:4040/user?login=${userLoginAuth}&password=${userPassAuth}`, {}).then(result => {
            console.log(result)
        })
    }

    const rightPanelActive = isSign ? 'container right-panel-active' : 'container'

    return (
        <>
            <div className={rightPanelActive} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Соаздайте пользователя</h1>
                        <InputText type="text" onChange={(event: any) => handleChangeLogin(event)} placeholder="Введите логин" />
                        <InputText type="email" onChange={(event: any) => handleChangeEmail(event)} placeholder="Введите Email" />
                        <InputText
                            type="text"
                            placeholder="Введите пароль"
                            onChange={(event: any) => handleChangePass1(event)}
                        />
                        <InputText
                            type="text"
                            placeholder="Введите пароль повторно"
                            onChange={(event: any) => handleChangePass2(event)}
                        />
                        {isPassError && <div style={{ color: 'red' }}>Пароли не совпадают</div>}
                        <button
                            onClick={handleClickLogin}
                        >Регистрация</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Авторизация</h1>
                        <InputText
                            type="text"
                            placeholder="login"
                            onChange={(e: any) => handleChangeLoginAuth(e)}
                            value={userLoginAuth}
                        />
                        <InputText type="password" 
                        placeholder="Password" 
                        onChange={(e: any) => handleChangePassAuth(e)}
                        value={userPassAuth}
                        />
                        <button
                            onClick={handleClickAuth}
                        >Авторизоваться</button>
                    </form>
                </div>
                <div className="overlay-container right-panel-active">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Добро пожаловать!</h1>
                            <p>Для использования нашего сервиса вам необходимо авторизоваться</p>
                            <button
                                onClick={handleClickSign}
                                className="ghost" id="signIn">
                                Авторизоваться
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Привет!</h1>
                            <p>Зарегистрируйтесь, чтобы использовать наш сервис</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={handleClickSign}
                            >Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}